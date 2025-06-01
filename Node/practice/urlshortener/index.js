const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const {checkForAuthentication,restrictTo} = require("./middlewares/auth")

const signuproutes = require("./routes/user")
const staticroutes = require('./routes/staticurl');
const routes = require('./routes/url');

const {connectDB} = require('./connect')
let path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));


// app.use('/url',routes);
app.use('/url',restrictTo(["NORMAL"]),routes);
app.use('/user',signuproutes);
app.use('/',staticroutes);

connectDB('mongodb://127.0.0.1:27017/short-url').then(()=>console.log("DB connected")).catch(()=>console.log("DB not connected"))
app.listen(8001,()=>console.log("creating short url"))