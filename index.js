const express = require('express')

const {connectMongoDB} = require('./connection')
const {logReqRes} = require('./middlewares/index')
const userRouter = require('./routes/user')

const app = express()
const PORT = process.env.PORT || 8000

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/rajat-initial")
.then(() => console.log("MongoDB Connected"))

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("logfile.txt"))

// Routes
app.use("/api/users", userRouter)


app.listen(PORT, () => console.log(`Server Started at : ${PORT}`))
