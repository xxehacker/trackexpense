const express = require('express')
const categoryControllers = require("../controllers/category.controllers");
const isAuthenticated = require("../middlewares/isAuthenticated");

const categoryRouter = express.Router();

categoryRouter.post("/create",isAuthenticated,categoryControllers.create)
categoryRouter.get("/lists",isAuthenticated,categoryControllers.lists)
categoryRouter.put("/update/:id",isAuthenticated,categoryControllers.update)
categoryRouter.delete("/delete/:id",isAuthenticated,categoryControllers.delete)


module.exports = categoryRouter;
