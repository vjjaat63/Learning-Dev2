const express = require('express')
const urls = require("../models/url")
const router = express.Router();

router.get("/",async (req,res)=>{
    const allurls = await urls.find();
    res.render("home",{
        urls : allurls,
    });
})

router.get("/user/signup",async (req,res)=>{
    res.render("signup");
})

router.get("/user/login",async (req,res)=>{
    res.render("login");
})


module.exports = router;