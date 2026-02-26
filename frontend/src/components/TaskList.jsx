import { useState } from "react";
import API from "../api/axios";
import "../css/tasks.css";

export default function TaskList({ tasks, fetchTasks }) {
  const [editingId, setEditingId] = useState(null);
  const [editTask, setEditTask] = useState({ title: "", description: "" });

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const toggleStatus = async (task) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        status: task.status === "completed" ? "pending" : "completed",
      });
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditTask({ title: task.title, description: task.description });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTask({ title: "", description: "" });
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/tasks/${id}`, {
        title: editTask.title,
        description: editTask.description,
      });
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks found. Time to add some!</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className={`task-card ${task.status}`}>
            {editingId === task._id ? (
              <div className="edit-mode">
                <input
                  className="edit-input"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                />
                <textarea
                  className="edit-textarea"
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                />
                <div className="button-group">
                  <button className="save-btn" onClick={() => saveEdit(task._id)}>Save</button>
                  <button className="cancel-btn" onClick={cancelEditing}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="view-mode">
                <div className="task-content">
                  <h4 className="task-title">{task.title}</h4>
                  <p className="task-desc">{task.description}</p>
                  <div className="task-meta">
                    <span className={`status-badge ${task.status}`}>{task.status}</span>
                    <span className="timestamp">{new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="task-actions">
                  <button className="status-btn" onClick={() => toggleStatus(task)}>
                    {task.status === "completed" ? "↺" : "✓"}
                  </button>
                  <button className="edit-btn" onClick={() => startEditing(task)}>✎</button>
                  <button className="delete-btn" onClick={() => handleDelete(task._id)}>🗑</button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}