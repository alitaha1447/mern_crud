const express = require("express");
const authRoute = express.Router();

const authController = require("../controllers/authController.js");

authRoute.post("/signUp", authController.signUp);
authRoute.post("/logIn", authController.logIn);

module.exports = authRoute;
