const express = require("express");
const taskRoute = express.Router();
const userAuth = require("../middlewares/authMiddleware.js");

const taskController = require("../controllers/taskController.js");

taskRoute.post("/createTask", userAuth, taskController.createTask);
taskRoute.get("/getTask",userAuth,taskController.getTask);
taskRoute.delete("/deleteTask/:id",userAuth,taskController.deleteTask);
taskRoute.put("/updateTask/:id",userAuth,taskController.updateTask);

module.exports = taskRoute;
