import { useState, useEffect, useContext } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css"; // Import the CSS

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | completed | pending

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data.tasks);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = async () => {
    await API.post("/auth/logout"); // clears cookie
    setUser(null);
  };

  // Apply search & filter
  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => (statusFilter === "all" ? true : task.status === statusFilter));

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Search and Filter */}
      <div className="search-filter-container">
        <input
          className="search-input"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <TaskForm fetchTasks={fetchTasks} />
      <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
    </div>
  );
}