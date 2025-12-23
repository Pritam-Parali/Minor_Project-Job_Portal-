import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Job.css";
import { fetchJobs } from "../api/jobService";
import Swal from "sweetalert2";

const Job = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;


  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("all"); // all | applied
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [appliedLoading, setAppliedLoading] = useState(false);


  // Fetch jobs from backend
  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        Swal.fire("Error", "Failed to load jobs", "error");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      setAppliedLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/applications/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch applied jobs");
      }

      setAppliedJobs(data);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setAppliedLoading(false);
    }
  };


  const handleApply = (jobId) => {
    navigate(`/apply/${jobId}`);
  };

  const handleCreateJob = () => {
    navigate("/Form");
  };

  if (loading) {
    return <h3 className="loading-text">Loading jobs...</h3>;
  }

  return (
    <div className="job-header">
      {/* HEADER */}
      <h1 className="job-title">Job Postings</h1>

      <div className="button-div">
        <Button
          variant={view === "applied" ? "success" : "outline-success"}
          onClick={() => {
            setView("applied");
            fetchAppliedJobs();
          }}
          className="me-2"
        >
          Applied Jobs
        </Button>

        <Button
          variant={view === "all" ? "primary" : "outline-primary"}
          onClick={() => setView("all")}
          className="me-2"
        >
          All Jobs
        </Button>
          
        <Button
          variant="primary"
          onClick={handleCreateJob}
          className="button-create-job"
        >
          Create Job
        </Button>
        <Button
          variant="primary"
          className="button-create-job ms-2"
          onClick={() => navigate("/my-job-applicants")}
        >
          View Applicants
        </Button>

      </div>
      

      {/* ================= ALL JOBS ================= */}
      {view === "all" && (
        <>
          {jobs.length === 0 ? (
            <h4 className="no-jobs-text">No jobs posted yet</h4>
          ) : (
            <div className="job-grid">
              {jobs.map((job) => (
                <div key={job._id} className="job-card">
                  {/* JOB BASIC INFO */}
                  <h3>{job.domain}</h3>
                  <p><strong>Company:</strong> {job.companyName}</p>
                  <p><strong>Job Location:</strong> {job.jobLocation}</p>
                  <p><strong>Salary:</strong> ₹{job.salary}</p>
                  <p><strong>Job Type:</strong> {job.jobType}</p>
                  <p><strong>Experience Level:</strong> {job.experienceLevel}</p>

                  <hr />

                  {/* POSTED BY */}
                  <p><strong>Posted By:</strong> {job.firstName} {job.lastName}</p>
                  <p><strong>Email:</strong> {job.email}</p>
                  <p><strong>Contact:</strong> {job.contactNumber}</p>

                  <hr />

                  {/* LOCATION DETAILS */}
                  <p><strong>City:</strong> {job.city}</p>
                  <p><strong>State:</strong> {job.state}</p>
                  <p><strong>Zip:</strong> {job.zip}</p>

                  <hr />

                  {/* QUALIFICATIONS */}
                  <p><strong>Qualifications:</strong> {job.qualifications}</p>
                  <p><strong>Skills:</strong> {job.skills}</p>
                  <p><strong>Description:</strong> {job.description}</p>

                  <hr />

                  {/* DATES & OTHER */}
                  <p>
                    <strong>Application Deadline:</strong>{" "}
                    {job.applicationDeadline
                      ? job.applicationDeadline.slice(0, 10)
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {job.startDate ? job.startDate.slice(0, 10) : "N/A"}
                  </p>
                  <p><strong>Work Hours:</strong> {job.workHours}</p>
                  <p><strong>Remote Option:</strong> {job.remoteOption}</p>

                  <p>
                    <strong>Company Website:</strong>{" "}
                    {job.companyWebsite ? (
                      <a
                        href={job.companyWebsite}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {job.companyWebsite}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </p>

                  <Button
                    variant="success"
                    className="apply-btn"
                    onClick={() => handleApply(job._id)}
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ================= APPLIED JOBS ================= */}
      {view === "applied" && (
        <>
          {appliedLoading ? (
            <h4>Loading applied jobs...</h4>
          ) : appliedJobs.length === 0 ? (
            <h4>You have not applied to any jobs yet</h4>
          ) : (
            <div className="job-grid">
              {appliedJobs.map((app) => (
                <div key={app._id} className="job-card">
                  <h3>{app.job?.domain}</h3>

                  <p>
                    <strong>Company:</strong> {app.job?.companyName}
                  </p>

                  <p>
                    <strong>Status:</strong> {app.status}
                  </p>

                  <p>
                    <strong>Applied On:</strong>{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default Job;
