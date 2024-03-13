const User = require('../models/user') 


async function handleGetAllUserfromDB(req, res){
    const allDbUsers = await User.find({})
    return res.json(allDbUsers)
}

async function handleGetUserByID(req, res){
    const user = await User.findById(req.params.id)
    return res.json(user)
}

async function handleUpdateUserByID(req, res){
    await User.findByIdAndUpdate(req.params.id, {lastName : "New LastName"});
    return res.json({status:`Used Updated With ID : ${req.params.id}`})
}

async function handleDeleteUserByID(req, res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:`Used Deleted With ID : ${req.params.id}`})
}

async function handleCreateNewUser(req, res){
    const body = req.body
    console.log(body);
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_profile
    ){
        return res.status(400).json({msg : "All fields are required..."});
    }

    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_profile,
    })

    console.log(result);
    return res.status(201).json({msg : "User created!! Yay!!", id : result._id})
}



module.exports = {
    handleGetAllUserfromDB,
    handleGetUserByID,
    handleDeleteUserByID,
    handleCreateNewUser,
    handleUpdateUserByID
}