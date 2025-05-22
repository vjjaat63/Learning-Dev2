const express = require('express');
const app = express();
const routes = require('./routes/url');
const {connectDB} = require('./connect')

app.use(express.json());

app.use('/url',routes);

connectDB('mongodb://127.0.0.1:27017/short-url').then(()=>console.log("DB connected")).catch(()=>console.log("DB not connected"))
app.listen(8001,()=>console.log("creating short url"))