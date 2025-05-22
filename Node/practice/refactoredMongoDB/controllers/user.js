const User = require("../models/user")

async function handlePrintAllUsers(req,res){
    const result = await User.find();
    return res.json(result);

}

async function handleAddUser(req,res){
    const body = req.body;

    if (!body || !body.firstName || !body.email || !body.age || !body.gender || !body.skill)
        return res.status(400).send("Cannot leave the required fields empty !");

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age,
        gender: body.gender,
        email: body.email,
        skill: body.skill,
    })
    console.log(result);
    return res.status(201).send("User Created Successfully !" + result._id);
}

async function handlePrintUserById(req,res){
    const result = await User.findById(req.params.id);
    if (!result) {
        return res.status(404).send("User not found");
    }
    return res.send(result);
}

async function handleDeleteUserById(req,res){
    const result = await User.findById(req.params.id);
    if (!result) {
        return res.status(404).send("User not found");
    }

    await User.findByIdAndDelete(req.params.id);

    return res.send("User Deleted Successfully !");
}

async function handleUpdateUserById(req,res){
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body)
    if (!updatedUser) {
        return res.status(404).send("User not found");
    }
    return res.json({ status: "Updated Successfully", details: updatedUser });
}

module.exports = {
    handlePrintAllUsers, handleAddUser, handlePrintUserById, handleUpdateUserById, handleDeleteUserById
}
