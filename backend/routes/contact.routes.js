const express = require("express");
const contactController = require("../controllers/contact.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const contactRouter = express.Router();

contactRouter.post("/", isAuthenticated, contactController.contact);


module.exports = contactRouter;