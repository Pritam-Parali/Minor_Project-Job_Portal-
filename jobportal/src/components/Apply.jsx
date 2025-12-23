import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Apply.css";
import { toast } from "react-toastify";

function Apply() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    qualification: "",
  });

  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cvFile) {
      toast.error("Please upload your CV before submitting");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append("cv", cvFile);

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to apply for a job");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/applications/apply/${jobId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Application failed");
        setLoading(false);
        return;
      }

      toast.success("Application submitted");

      // optional redirect
      setTimeout(() => {
        navigate("/job");
      }, 1500);

    } catch (error) {
      toast.error("Server error. try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-container">
      <form className="apply-form" onSubmit={handleSubmit}>
        <h2>Apply for Job</h2>
        <p>Job ID: {jobId}</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />

        <select name="qualification" onChange={handleChange} required>
          <option value="">Select Qualification</option>
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="Graduate">Graduate</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default Apply;
