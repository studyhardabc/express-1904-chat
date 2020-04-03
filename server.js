const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
//引入socket.io
const socketIo = require('socket.io');
const session = require('express-session');
require('express-async-errors');

const indexRouter = require('./routers/indexRouter');
const userRouter = require('./routers/userRouter');

const app = express();

//处理一下模板引擎
app.set('view engine','ejs');
app.set('views','./views');

//处理一下中间件
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//会给req对象上添加一个session的属性
app.use(session({
  //密钥
  secret: process.env.SESSION_SECRET,
  //是否每次有请求的时候都去更新有效时间
  resave: false,
  //是否初始化时设置一次
  saveUninitialized: true
}));

//处理路由中间件
app.use('/', indexRouter);
app.use('/users', userRouter);

//统一错误处理  需要放置在中间件与路由代码之后
app.use((err,req,res,next) => {
  console.log(err);
  res.status(500).send(err.message);
});

const server = app.listen(3000, () => {
  console.log('服务启动成功');
});

//通过socketIo.listen去与当前服务关联上
const io = socketIo.listen(server);

//建立io的connection事件去处理客户端连接
io.on('connection', socket => {
  //提供一个事件叫做setName供客户端去设置名字
  socket.on('setName', username => {
    //给当前socket添加一个名字，值就是传递过来的username
    socket.username = username;

    //给其他人发送一个系统消息，xxx进入聊天室
    socket.broadcast.emit('message', {
      username: 'System',
      message: `欢迎${socket.username}进入直播间`
    })
  });

  //监听message事件，这个事件由客户端触发
  socket.on('message', data => {
    //data {message: value}

    //转给当前客户端
    socket.emit('message', {
      username: socket.username,
      message: data.message
    })

    //转发给其他客户端
    socket.broadcast.emit('message', {
      username: socket.username,
      message: data.message
    })
  })
});

