import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("credentials"); // credentials | otp
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // STEP 1 → Send OTP to email after checking password
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await API.post("/users/login", formData);
      setMsg(res.data.message || "OTP sent to email");
      setStep("otp");
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 → Verify OTP and login
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await API.post("/users/verify-login-otp", {
        email: formData.email,
        otp,
      });

      // Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/Job");
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{step === "credentials" ? "Sign In" : "Enter OTP"}</h2>

        {msg && (
          <p style={{ color: "yellow", marginBottom: "15px", fontSize: "0.9rem" }}>
            {msg}
          </p>
        )}

        {step === "credentials" && (
          <form onSubmit={handleSendOtp}>
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

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <span className="icon">🔢</span>
            </div>

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        <p className="register-text">
          Don't have an account? <a href="/Register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
