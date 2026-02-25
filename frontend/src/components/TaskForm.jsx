import { useState } from "react";
import API from "../api/axios";

export default function TaskForm({ fetchTasks }) {
  const [task, setTask] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", task);
      setTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
      />
      <input
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}