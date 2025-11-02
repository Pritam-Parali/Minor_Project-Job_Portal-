import React, { useState } from "react";
import "./Register.css";
import Navbar from "./Navbar"; // ✅ kept from sayan branch

const Register = () => {
  const [formData, setFormData] = useState({
    userType: "User",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userType: formData.userType,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "⚠️ Registration failed");
      } else {
        alert(`✅ ${result.message || "Registration successful!"}`);
        console.log("Server response:", result);

        // Clear form
        setFormData({
          userType: "User",
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });

        // Redirect if admin
        if (formData.userType === "Admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/login";
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("❌ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Optional Navbar */}
      {/* <Navbar /> */}

      <div className="register-page">
        <div className="register-container">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            {/* User Type Dropdown */}
            <div className="input-group">
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="User">👤 User</option>
                <option value="Admin">👑 Admin</option>
              </select>
            </div>

            {/* Username */}
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <span className="icon">👤</span>
            </div>

            {/* Email */}
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span className="icon">📧</span>
            </div>

            {/* Phone */}
            <div className="input-group">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <span className="icon">📱</span>
            </div>

            {/* Password */}
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span className="icon">🔒</span>
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span className="icon">🔒</span>
            </div>

            {/* Submit */}
            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
