// src/pages/Tasks.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (keyword = "") => {
    try {
      const token = localStorage.getItem("token");
      // const url = `http://localhost:4000/api/task/getTasks`;
      const url = keyword
        ? `http://localhost:4000/api/task/getTasks/${keyword}`
        : `http://localhost:4000/api/task/getTasks`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res?.data?.tasks); // ✅ Ensure state update happens
      // setTasks(res?.data); // ✅ Ensure state update happens
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  return (
    <div>
      <TaskForm
        fetchTasks={fetchTasks}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
};

export default Tasks;
