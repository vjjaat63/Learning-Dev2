const user = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../services/auth')

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await user.create({
        name, email, password
    })

    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const User = await user.findOne({ email, password });
    
    if (!User)
        return res.render("login", { error: "Invalid Username or Password" })

    const token = setUser(User);

    res.cookie("token", token);

    return res.redirect("/");
}

module.exports = {
    handleUserSignup, handleUserLogin
}