import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("setusername");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <header>
        <h1>👑 Admin Dashboard</h1>
        <p>Welcome back, {username}</p>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Total Users</h3>
          <p>128</p>
        </div>

        <div className="card">
          <h3>Active Jobs</h3>
          <p>42</p>
        </div>

        <div className="card">
          <h3>Applications</h3>
          <p>350+</p>
        </div>

        <div className="card">
          <h3>New Messages</h3>
          <p>7</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
