const express = require("express");
const route = express.Router();
const authRoute = require("./authRoutes");
const taskRoute=require("./taskRoutes")

route.use("/auth", authRoute);
route.use("/task",taskRoute)

module.exports = route;
