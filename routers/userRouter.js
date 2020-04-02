const express = require('express');
const bcryptjs = require('bcryptjs');
const UserModel = require('../db/models/userModel');
const router = express.Router();

//POST /users/login 登录操作
router.post('/login', async (req,res) => {
    //获取页面传递过来的参数
    const {username,password} = req.body;

    //判断是否已经注册过
    let user = await UserModel.findOne({username});
    if(!user){
        //不存在，先做注册
        user = await UserModel.create({username, password});
    }

    //验证密码是否正确
    if(user.comparePassword(password)){
        //通过就可以登录
        //给req.session 上添加一个auth属性，保存当前用户的id和username等信息
        //后续判断用户是否登录，只需要判断req.session中有没有auth这个属性即可
        req.session.auth = {
            userId : user._id,
            username: user.username
        }
        res.send('登录成功')
    }else{
        //不通过，用户名或密码不正确
        throw new Error('用户名或密码不正确');
    }
});

module.exports = router;