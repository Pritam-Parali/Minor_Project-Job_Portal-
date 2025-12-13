import API from "./axios";

// CREATE JOB
export const createJob = (formData) =>
  API.post("/jobs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// FETCH ALL JOBS
export const fetchJobs = async () => {
  const response = await API.get("/jobs");
  return response.data;
};
