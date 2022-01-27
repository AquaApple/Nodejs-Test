const express = require("express")
const {register,login,dashboard} = require("../controllers/user.controller")
const userRouter = express.Router()

userRouter.post('/', register)

userRouter.post('/login', login)

userRouter.get('/dashboard', dashboard)

module.exports = { userRouter }