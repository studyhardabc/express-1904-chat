module.exports = (req,res,next) => {
    //判断是否登录了
    if(req.session.auth){
        //登录了
        req.auth = req.session.auth;
        next();
    }else{
        //没登录，直接返回登录页面
        //跳转页面前把url存进session
        req.session.redirect = req.url;
        res.redirect('/login');
        // res.redirect(`/login?redirect=${req.url}`)
    }
}