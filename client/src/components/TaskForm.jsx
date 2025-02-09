// src/components/TaskForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskForm = ({ fetchTasks, selectedTask, setSelectedTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  // Pre-fill form when a task is selected for update
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description);
      setStatus(selectedTask.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("")
    }
  }, [selectedTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (selectedTask) {
        // Update existing task
        await axios.put(
          `http://localhost:4000/api/task/updateTask/${selectedTask._id}`,
          { title, description, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSelectedTask(null); // Clear selection after update
        setTitle("");
        setDescription("");
        setStatus("");
      } else {
        // Create new task
        await axios.post(
          `http://localhost:4000/api/task/createTask`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTitle("");
        setDescription("");
      }
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setSelectedTask(null);
    setTitle("");
    setDescription("");
    setStatus("");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">
          {selectedTask ? "Update Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          {selectedTask ? (
            <>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <input
                  type="text"
                  id="status"
                  className="form-control"
                  placeholder="Enter task Stust"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="form-control"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary w-100">
            {selectedTask ? "Update Task" : "Add Task"}
          </button>
          {selectedTask && (
            <button
              type="button"
              className="btn btn-secondary w-100 mt-2"
              onClick={handleCancel}>
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
