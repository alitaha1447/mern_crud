const express = require("express");
const multer = require("multer");
const taskRoute = express.Router();
const userAuth = require("../middlewares/authMiddleware.js");

const taskController = require("../controllers/taskController.js");
const {upload} = require("../config/multerStorage.js")
// Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./src/uploads"); // Ensure this directory exists
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "_" + file.originalname); // Unique filename
//   },
// });

// const upload = multer({ storage: storage });

taskRoute.post(
  "/createTask",
  userAuth,
  upload.single("image"),
  taskController.createTask
);
// taskRoute.get("/getTasks", userAuth, taskController.getTask);
taskRoute.get("/getTasks/:keyword?", userAuth, taskController.getTask);
taskRoute.delete("/deleteTask/:id", userAuth, taskController.deleteTask);
taskRoute.put("/updateTask/:id", userAuth, taskController.updateTask);

module.exports = taskRoute;
