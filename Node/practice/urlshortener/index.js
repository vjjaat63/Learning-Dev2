const express = require('express');
const app = express();
const staticroutes = require('./routes/staticurl');
const routes = require('./routes/url');
const {connectDB} = require('./connect')
let path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));


app.use('/url',routes);
app.use('/',staticroutes);

connectDB('mongodb://127.0.0.1:27017/short-url').then(()=>console.log("DB connected")).catch(()=>console.log("DB not connected"))
app.listen(8001,()=>console.log("creating short url"))