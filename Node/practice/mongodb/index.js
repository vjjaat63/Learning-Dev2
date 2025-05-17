const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.urlencoded({extended : false}));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/learningDB")
.then(console.log("Mongo DB connected"))
.catch((err)=>console.log("Failed to connect to DB : ",err));

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    skill : {
        type : String,
        required : true
    }

},{timestamps : true});

const User = mongoose.model("user",UserSchema);


app.get("/api/users",async(req,res)=>{
    const result = await User.find();
    return res.json(result);
})

app.post("/api/users",async(req,res)=>{
    const body = req.body;

    if (!body || !body.firstName || !body.email || !body.age || !body.gender || !body.skill)
    return res.status(400).send("Cannot leave the required fiels empty !");

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        age : body.age,
        gender : body.gender,
        email : body.email,
        skill : body.skill,
    })
    console.log(result);
    return res.status(201).send("User Created Successfully !");

})

app.route("/api/users/:id")
.get(async(req,res) =>{
    const result = await User.findById(req.params.id);
    if (!result) {
        return res.status(404).send("User not found");
    }
    return res.send(result);
})
.delete(async (req,res)=>{
    const result = await User.findById(req.params.id);
    if (!result) {
        return res.status(404).send("User not found");
    }

    await User.findByIdAndDelete(req.params.id);

    return res.send("User Deleted Successfully !");
})
.patch(async(req,res)=>{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
    if (!updatedUser) {
        return res.status(404).send("User not found");
    }
    return res.json({status : "Updated Successfully", details : updatedUser});
})

app.listen(8000,console.log("Fetching started at port no. 8000"));