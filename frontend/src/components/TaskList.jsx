import { useState } from "react";
import API from "../api/axios";

export default function TaskList({ tasks, fetchTasks }) {
  const [editingId, setEditingId] = useState(null);
  const [editTask, setEditTask] = useState({ title: "", description: "" });

  const handleDelete = async (id) => {
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
    <div>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{ border: "1px solid gray", margin: "5px", padding: "5px" }}
          >
            {editingId === task._id ? (
              <>
                <input
                  value={editTask.title}
                  onChange={(e) =>
                    setEditTask({ ...editTask, title: e.target.value })
                  }
                />
                <textarea
                  value={editTask.description}
                  onChange={(e) =>
                    setEditTask({ ...editTask, description: e.target.value })
                  }
                />
                <button onClick={() => saveEdit(task._id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </>
            ) : (
              <>
                <h4>Title: {task.title}</h4>
                <p>Description: {task.description}</p>
                <p>Status: {task.status}</p>
                <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
                <button onClick={() => toggleStatus(task)}>
                  {task.status === "completed" ? "Mark Pending" : "Mark Completed"}
                </button>
                <button onClick={() => startEditing(task)}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}