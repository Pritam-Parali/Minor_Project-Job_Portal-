import API from "./axios";

export const createJob = (formData) =>
    API.post("/jobs", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
