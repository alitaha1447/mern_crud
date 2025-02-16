const express = require("express");
const Task = require("../modals/Task"); // Import the Task model
const router = express.Router();

// Create a new task
module.exports = {
  createTask: async (req, res) => {
    try {
      // Ensure the file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Create a new task with the uploaded file
      const task = new Task({
        title: req.body.title,
        description: req.body.description,
        image: req.file.filename, // Use the filename from multer
        userId: req.user.id, // Associate the task with the authenticated user
      });

      const response = await task.save();
      //  console.log('image --> ',response)
      res.status(201).json({
        message: "Task created successfully",
        task: task,
      });
    } catch (err) {
      // console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  //
  // getTask: async (req, res) => {
  //   console.log(req)
  //   try {
  //     let query = { userId: req.user.id }; // Ensure only logged-in user's tasks are fetched
  //     console.log(query)
  //     const tasks = await Task.find(query);
  //     res.json(tasks);
  //   } catch (err) {
  //     res.status(500).json({ message: "Server error" });
  //   }
  // },
  getTask: async (req, res) => {
    try {
      const { keyword } = req.params;
      const matchStage = { userId: req.user._id }; // Ensure only logged-in user's tasks

      // if (keyword) {
      //   matchStage.title = { $regex: new RegExp(keyword, "i") }; // Case-insensitive search
      // }
      
      // for exact match
      if (keyword) {
        matchStage.title = keyword; // Exact match
      }

      const tasks = await Task.aggregate([
        { $match: matchStage }, // Apply filtering
        // { $sort: { createdAt: -1 } }, // Sort by newest first
      ]);
      res.json({ message: "Tasks fetched successfully", tasks });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
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
      let task = await Task.findByIdAndUpdate(req.params.id, {
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
