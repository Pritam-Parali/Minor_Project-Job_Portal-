import { useState } from "react";
import { useParams } from "react-router-dom";
import './Apply.css';

function Apply() {
  const { jobId } = useParams();
  const [formData, setFormData] = useState({
    name: "", address: "", email: "", phone: "", qualification: "", jobId
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(formData)
    });
    alert("Application Sent!");
  };

  return (
    <div>
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required /><br/>
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required /><br/>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required /><br/>
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required /><br/>
        <select name="qualification" onChange={handleChange} required>
          <option value="">Select Qualification</option>
          <option value="B.Tech">B.Tech</option>
          <option value="M.Tech">M.Tech</option>
          <option value="BCA">BCA</option>
          <option value="MCA">MCA</option>
          <option value="M.Tech">GRADUATE</option>
          <option value="OTHER">OTHER</option>
        </select><br/>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
export default Apply;
