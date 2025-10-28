import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allUsers = JSON.parse(localStorage.getItem("RegisteredUsers")) || [];
    const foundUser = allUsers.find(
      (u) =>
        u.username === formData.username && u.password === formData.password
    );

    if (!foundUser) {
      alert("Invalid username or password!");
      return;
    }

    // Generate and verify OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    alert("Your OTP is: " + otp);
    const enteredOtp = prompt("Enter OTP:");

    if (String(otp) === enteredOtp) {
      alert("Login Successful!");
      localStorage.setItem("LoggedIn", "true");
      localStorage.setItem("setusername", foundUser.username);
      localStorage.setItem("userType", foundUser.userType);

      if (foundUser.userType === "Admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/index");
      }
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="register-text">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
