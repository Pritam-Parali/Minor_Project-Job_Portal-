import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminCards from "./AdminCards";
import AdminCharts from "./AdminCharts";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalJobs: 0,
        totalCompanies: 0,
    });

    const [jobsPerWeek, setJobsPerWeek] = useState([]);
    const [jobsByType, setJobsByType] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const headers = { Authorization: `Bearer ${token}` };

        axios.get("http://localhost:5000/api/admin/stats", { headers })
            .then(res => setStats(res.data))
            .catch(err => console.error(err));

        axios.get("http://localhost:5000/api/admin/jobs-per-week", { headers })
            .then(res => setJobsPerWeek(res.data))
            .catch(err => console.error(err));

        axios.get("http://localhost:5000/api/admin/jobs-by-type", { headers })
            .then(res => setJobsByType(res.data))
            .catch(err => console.error(err));
    }, [token]);

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard 👑</h1>

            <AdminCards stats={stats} />

            <AdminCharts
                jobsPerWeek={jobsPerWeek}
                jobsByType={jobsByType}
            />
        </div>
    );
};

export default AdminDashboard;
