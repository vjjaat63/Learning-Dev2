const express = require("express");
const app = express();
const userRouter = require("./routes/user")
const {connectMongoDB} = require('./connection')
const {logReqRes} = require('./middlewares/index')

connectMongoDB("mongodb://127.0.0.1:27017/learningDB").then(console.log("MongoDB connected successfully"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqRes("log.txt"));


app.use("/api/users",userRouter);

app.listen(8000, console.log("Fetching started at port no. 8000"));