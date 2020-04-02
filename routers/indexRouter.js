const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

//GET / 欢迎页面
router.get('/', (req,res) => {
    res.render('welcome.ejs');
})

//GET /chatroom 聊天室页面
router.get('/chatroom', auth, (req,res) => {
    res.render('chatroom.ejs',{username: req.auth.username});//渲染聊天室页面的时候，把当前的用户名变量带到模板页面
})

//GET /login 登录页面
router.get('/login', (req,res) => {
    //可以获取？传参
    // const redirect = req.query.redirect || '/';
    // res.render('login', {redirect});//把这个变量带到模板页面
    res.render('login');
})

//GET /posts 帖子列表页面
router.get('/posts',auth, (req,res) => {
    res.render('post/index.ejs');
})

module.exports = router;
