const express = require('express')
const userControllers = require("../controllers/user.controllers");
const isAuthenticated = require("../middlewares/isAuthenticated");

const userRouter = express.Router();

userRouter.post("/register",userControllers.register)
userRouter.post("/login",userControllers.login)
userRouter.put("/update",isAuthenticated,userControllers.update)
userRouter.get("/profile",isAuthenticated,userControllers.profile)




module.exports = userRouter;
