// src/components/TaskList.js
import React,{useState} from "react";
import axios from "axios";

const TaskList = ({ tasks, fetchTasks, setSelectedTask }) => {
  // console.log('==',tasks)
  const [searchQuery, setSearchQuery] = useState("");

  // Delete a task
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/task/deleteTask/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Set task for update
  const handleUpdate = (task) => {
    setSelectedTask(task);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchTasks(e.target.value); // Fetch tasks based on search input dynamically
  };
  console.log(searchQuery)
  return (
    <div className="container mt-4">
       <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task List</h2>
        <div className="w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td><img src={`http://localhost:4000/${task.image}`} width={50} className="img-thumbnail" alt=""/></td>
                <td>{task.status || "Pending"}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleUpdate(task)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
