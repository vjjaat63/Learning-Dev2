const express = require('express')
const urls = require("../models/url")
const router = express.Router();

router.get("/",async (req,res)=>{
    const allurls = await urls.find();
    res.render("home",{
        urls : allurls,
    });
})

module.exports = router;