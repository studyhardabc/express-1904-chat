module.exports = (req,res,next) => {
    //判断是否登录了
    if(req.session.auth){
        //登录了
        req.auth = req.session.auth;
        next();
    }else{
        //没登录，直接返回登录页面
        res.redirect('/login');
    }
}