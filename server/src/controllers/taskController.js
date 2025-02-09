const express = require("express");
const Task = require("../modals/Task"); // Import the Task model
const router = express.Router();

// Create a new task
module.exports = {
  createTask: async (req, res) => {
    const { title, description } = req.body;
    console.log('req.user 1 -----------> ',req.user)
    try {
      // Extract userId from the token (set by the authMiddleware)
      const userId = req.user.id;
      // Create a new task with the userId
      const task = new Task({
        title,
        description,
        userId, // Associate the task with the authenticated user
      });
      await task.save();
      res.status(201).json({
        message: "Task created successfully",
        task: task,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  //
  getTask: async (req, res) => {
    try {
      const tasks = await Task.find({ userId: req?.user?._id });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
  //
  deleteTask: async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({ _id: req.params.id });
      res.status(201).json({
        message: "Task Deleted Successfully",
        task: task,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
  //
  updateTask: async (req, res) => {
    const { title, description, status } = req.body;

    try {
      let task = await Task.findByIdAndUpdate(req.params.id,{
        ...req.body,
        updatedAt: Date.now(),
      });


      res.status(201).json({
        message: "Task Updated Successfully",
        task: task,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};
