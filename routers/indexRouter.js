const express = require('express');
const auth = require('../middlewares/auth');
const router = express.Router();

//GET / 欢迎页面
router.get('/', (req,res) => {
    res.render('welcome.ejs');
})

//GET /chatroom 聊天室页面
router.get('/chatroom', auth, (req,res) => {
    res.render('chatroom.ejs');
})

//GET /login 登录页面
router.get('/login', (req,res) => {
    res.render('login');
})

module.exports = router;
