const user = require("../models/user")

async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    await user.create({
        name,email,password
    })

    return res.redirect("/");
}

async function handleUserLogin(req,res){
    const {email,password} = req.body;

    const User = await user.findOne({email,password});
    if(!User)
        return res.render("login", {error :"Invalid Username or Password"})

    return res.redirect("/");
}

module.exports = {
    handleUserSignup,handleUserLogin
}