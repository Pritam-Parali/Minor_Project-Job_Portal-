import API from "./axios";
export const createJob = (formData) => API.post("/jobs", formData);
export const getJobs = () => API.get("/jobs");
