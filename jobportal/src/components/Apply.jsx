import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Apply.css";

function Apply() {
  const { jobId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    qualification: "",
    jobId,
  });

  const [cvFile, setCvFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cvFile) {
      alert("Please upload your CV before submitting.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append("cv", cvFile);

    await fetch("http://localhost:5000/apply", {
      method: "POST",
      body: data,
    });

    alert("Application Sent!");
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

        {/* Upload CV */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Apply;
