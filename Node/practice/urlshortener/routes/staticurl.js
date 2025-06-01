const express = require('express')
const urls = require("../models/url")
const router = express.Router();
const {restrictTo} = require("../middlewares/auth")

router.get("/", restrictTo(["NORMAL"]) ,async (req,res)=>{
    const allurls = await urls.find({createdBy : req.user._id});

    res.render("home",{
        urls : allurls,
    });
})

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
    const allurls = await urls.find({});

    res.render("home", {
        urls: allurls,
    });
})

router.get("/signup",async (req,res)=>{
    res.render("signup");
})

router.get("/login",async (req,res)=>{
    res.render("login");
})


module.exports = router;