const {getUser} = require("../services/auth");

function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;

    if (!tokenCookie)
        return next();

    const user = getUser(tokenCookie);
    req.user = user;
    next();
}

function restrictTo(roles = []){
    return function(req,res,next){
        if(!req.user)
            return res.redirect('/login')

        console.log(req.user);
        if(!req.user.role)
            return res.end("UnAuthorized")

        return next();
    }
}
module.exports = {
    checkForAuthentication,restrictTo
}