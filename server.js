const express = require('express');
require('express-async-errors');

const indexRouter = require('./routers/indexRouter')

const app = express();

//处理一下模板引擎
app.set('view engine','ejs');
app.set('views','./views');

//处理一下中间件
app.use(express.static('./public'))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//处理路由中间件
app.use('/', indexRouter);

//统一错误处理  需要放置在中间件与路由代码之后
app.use((err,req,res,next) => {
  console.log(err);
  res.status(500).send(err.message);
});

const server = app.listen(3000, () => {
  console.log('服务启动成功');
});