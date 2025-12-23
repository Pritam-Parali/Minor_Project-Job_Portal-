import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchJobs } from "../api/jobService";

const MyJobApplicants = () => {
    const [myJobs, setMyJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applicants, setApplicants] = useState({});
    const [openJobId, setOpenJobId] = useState(null);


    // get logged-in user
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    useEffect(() => {
        const getMyJobs = async () => {
            try {
                const allJobs = await fetchJobs();

                // filter only jobs created by logged-in user
                const filteredJobs = allJobs.filter(
                    (job) => job.createdBy === userId
                );

                setMyJobs(filteredJobs);
                toast.success("Your jobs loaded successfully");
            } catch (error) {
                console.error(error);
                toast.error("Failed to load your jobs");
            } finally {
                setLoading(false);
            }
        };

        getMyJobs();
    }, [userId]);
    const fetchApplicantsByJob = async (jobId) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:5000/api/applications/job/${jobId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to fetch applicants");
            }

            setApplicants((prev) => ({
                ...prev,
                [jobId]: data,
            }));
        } catch (error) {
            toast.error(error.message);
        }
    };


    if (loading) {
        return <h4 style={{ padding: "20px" }}>Loading your jobs...</h4>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>My Job Applicants</h2>

            {myJobs.length === 0 ? (
                <p>You have not posted any jobs yet.</p>
            ) : (
                myJobs.map((job) => (
                    <div
                        key={job._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "15px",
                            marginBottom: "15px",
                            borderRadius: "8px",
                        }}
                    >
                        <h4>{job.domain}</h4>

                        <p>
                            <strong>Company:</strong> {job.companyName}
                        </p>

                        <p>
                            <strong>Location:</strong> {job.jobLocation}
                        </p>

                        <p>
                            <strong>Job Type:</strong> {job.jobType}
                        </p>

                        <button
                            onClick={() => {
                                if (openJobId === job._id) {
                                    setOpenJobId(null);
                                } else {
                                    setOpenJobId(job._id);
                                    if (!applicants[job._id]) {
                                        fetchApplicantsByJob(job._id);
                                    }
                                }
                            }}
                            style={{
                                marginTop: "10px",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                cursor: "pointer",
                            }}
                        >
                            {openJobId === job._id ? "Hide Applicants" : "View Applicants"}
                        </button>
                        {openJobId === job._id && (
                            <div
                                style={{
                                    marginTop: "12px",
                                    paddingLeft: "12px",
                                    borderLeft: "3px solid #ddd",
                                }}
                            >
                                {!applicants[job._id] ? (
                                    <p>Loading applicants...</p>
                                ) : applicants[job._id].length === 0 ? (
                                    <p>No applicants for this job yet.</p>
                                ) : (
                                    applicants[job._id].map((app) => (
                                        <div
                                            key={app._id}
                                            style={{
                                                marginBottom: "10px",
                                                paddingBottom: "8px",
                                                borderBottom: "1px solid #eee",
                                            }}
                                        >
                                            <p><strong>Name:</strong> {app.name}</p>
                                            <p><strong>Email:</strong> {app.email}</p>
                                            <p><strong>Phone:</strong> {app.phone}</p>
                                            <p><strong>Status:</strong> {app.status}</p>

                                            <a
                                                href={`http://localhost:5000/${app.cv}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                View CV
                                            </a>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}


                    </div>
                ))
            )}
        </div>
    );
};

export default MyJobApplicants;
