const express = require('express')
const router = express.Router()

const {handleDeleteUserByID, handleGetAllUserfromDB, handleGetUserByID, handleCreateNewUser, handleUpdateUserByID} = require("../controllers/user")

router.route('/')
.get(handleGetAllUserfromDB)
.post(handleCreateNewUser)

//For getting user with any particular ID
router
.get("/:id", handleGetUserByID)
.patch("/:id",handleUpdateUserByID)
.delete("/:id",handleDeleteUserByID)

module.exports = router;