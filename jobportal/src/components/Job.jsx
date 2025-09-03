import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Job = () => {
  const navigate = useNavigate();

  // Sample Job Data
  const jobs = [
    { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Bangalore", salary: "₹8 LPA" },
    { id: 2, title: "Backend Developer", company: "CodeSolutions", location: "Hyderabad", salary: "₹10 LPA" },
    { id: 3, title: "Full Stack Developer", company: "DevStudio", location: "Remote", salary: "₹12 LPA" },
  ];

  // Handle Apply Button Click
  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`); 
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>Job Postings</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", marginTop: "20px" }}>
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                background: "#f9f9f9",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              <h2>{job.title}</h2>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <button
                onClick={() => handleApply(job.id)}
                style={{
                  background: "#007bff",
                  color: "#fff",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px"
                }}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Job;