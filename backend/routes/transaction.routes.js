const express = require('express')
const transactionControllers = require("../controllers/transaction.controllers");
const isAuthenticated = require("../middlewares/isAuthenticated");

const transactionRouter = express.Router();

transactionRouter.post("/create",isAuthenticated,transactionControllers.create)
transactionRouter.get("/lists",isAuthenticated,transactionControllers.getFilteredTransactions)
transactionRouter.put("/update/:id",isAuthenticated,transactionControllers.update)
transactionRouter.delete("/delete/:id",isAuthenticated,transactionControllers.delete)




module.exports = transactionRouter;
