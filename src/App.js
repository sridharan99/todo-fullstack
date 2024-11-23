import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskLists";
import "./App.css";
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);
  // Save tasks to localStorage on update
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };
  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
  };
  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };
  return (
    <div className="app">
      <h1>Update Your Task</h1>
      <TaskForm onSubmit={editingTask ? updateTask : addTask} editingTask={editingTask} />
      <TaskList tasks={tasks} setEditingTask={setEditingTask} deleteTask={deleteTask} />
    </div>
  );
};
export default App;