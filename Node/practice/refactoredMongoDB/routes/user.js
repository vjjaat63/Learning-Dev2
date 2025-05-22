const express = require("express");

const router = express.Router();
const { handlePrintAllUsers, handleAddUser, handlePrintUserById,handleUpdateUserById,handleDeleteUserById }  = require("../controllers/user")

router.route("/")
.get(handlePrintAllUsers)
.post(handleAddUser);

router.route("/:id")
    .get(handlePrintUserById)
    .delete(handleDeleteUserById)
    .patch(handleUpdateUserById)

module.exports = router;