import { useState } from "react";
import API from "../api/axios";
import "../css/taskform.css"; // We'll create this file

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
    <div className="task-form-container">
      <h3 className="form-title">Create New Task</h3>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            className="form-input"
            placeholder="Add Title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Add some Description (optional)..."
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </div>
        <button className="add-task-btn" type="submit">
          + Add Task
        </button>
      </form>
    </div>
  );
}