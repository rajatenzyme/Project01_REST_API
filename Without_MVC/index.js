const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 8000

mongoose.connect('mongodb://127.0.0.1:27017/rajat-initial')
.then(() => console.log("Mongo DB Connected"))
.catch(err => console.log("Mongo connection error ",err));

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type: String,
    },
    gender : {
        type : String,
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
    jobTitle : {
        type : String
    },   
},{timestamps : true},);

const User = mongoose.model("user", userSchema);


const users = require('./MOCK_DATA.json')
const { create } = require('domain')
// console.log(users)  

//Middleware
app.use(express.urlencoded({extended: false}));

// HTML response
app.get("/users", (req, res) => {
    const htmlFile = `
    <ul> 
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")} 
    <ul>
    `;         
     res.send(htmlFile)
})

// APIs
// For getting all users at once
app.get("/api/users", (req, res) => {
    return res.json(users)
})

//For getting user with any particular ID
app.get("/api/users/:id", (req, res) => {
    id = Number(req.params.id);
    const user = users.find((user) => (user.id === id))
    return res.json(user)
})


// POST

app.post("/api/users", async (req, res) => {
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
    return res.status(201).json({msg : "User created!! Yay!!"})

})


//PATCH
app.patch("/api/users/:id",async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName : "New LastName"});
    return res.json({status:`Used Updated With ID : ${req.params.id}`})
})

//DELETE

app.delete("/api/users/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:`Used Deleted With ID : ${req.params.id}`})
  })


app.listen(PORT, () => console.log(`Server Started at : ${PORT}`))
