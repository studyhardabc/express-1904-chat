//引入连接了MongoDB的mongoose
const mongoose = require('../connect');
const bcryptjs = require('bcryptjs');

//定义schema
const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},

    avatar: {type: String, default: 'http://localhost:3000/assets/img/avatar.png'}
})

userSchema.pre('save', function (next){
    this.password = bcryptjs.hashSync(this.password,10);
    next();
})

//给UserModer提供一个原型方法
userSchema.methods.comparePassword = function (password){
    return bcryptjs.compareSync(password,this.password);
};

const UserModel = mongoose.model('user',userSchema);

module.exports = UserModel;