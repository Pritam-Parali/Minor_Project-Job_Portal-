import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Job.css";
import { fetchJobs } from "../api/jobService";
import Swal from "sweetalert2";

const Job = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <h1 className="job-title">Job Postings</h1>

      
        <Button variant="primary" onClick={handleCreateJob} className="button-create-job">
          Create Job
        </Button>
      

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
    </div>
  );
};

export default Job;
