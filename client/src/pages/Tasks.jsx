// src/pages/Tasks.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:4000/api/task/getTask`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
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
