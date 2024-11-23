import React, { useState, useEffect } from "react";
const TaskForm = ({ onSubmit, editingTask }) => {
  const [task, setTask] = useState({ title: "", description: "", dueDate: "", status: "Pending" });
  useEffect(() => {
    if (editingTask) setTask(editingTask);
  }, [editingTask]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ title: "", description: "", dueDate: "", status: "Pending" });
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
      
        type="text"
        name="title"c
        placeholder="Task Title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={task.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
      />
      <select name="status" value={task.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
};
export default TaskForm;