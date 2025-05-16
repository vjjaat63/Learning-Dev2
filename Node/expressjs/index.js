const me = require("../Biodata/bio");

const express = require("express");

const app = express();

app.get('/',(req,res)=>{
    return res.send("Homepage");
})

app.get('/contact',(req,res)=>{
    return res.send(`${me.phone_no}`);
})

app.get('/about',(req,res)=>{
    if("user" in req.query && "age" in req.query)
        return res.send(`Hello Mr. ${req.query.user},Welocome ! Your current age is ${req.query.age}`);
    
    if ("user" in req.query)
        return res.send(`Hello Mr. ${req.query.user},Welocome !`);
})

app.listen(8000,console.log("fetching server "));