//连接数据库的文件
const mongoodse = require('mongoose');
const url = 'mongodb://localhost:27017/express-1904-chat';

mongoodse.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log('数据库连接成功');
}).catch( () => {
    console.log('数据库连接失败');
    console.log(error);
});

module.exports = mongoodse;