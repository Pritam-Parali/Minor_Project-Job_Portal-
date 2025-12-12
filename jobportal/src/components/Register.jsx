import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [step, setStep] = useState("form"); // form | otp
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // STEP 1 → Register & send OTP
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "Registration failed");
      } else {
        setMsg("OTP sent to your email");
        setStep("otp");
      }
    } catch (err) {
      console.error(err);
      setMsg("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 → Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(
        "http://localhost:5000/api/users/verify-register-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, otp }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message || "OTP verification failed");
      } else {
        alert("Account verified! You can now login.");
        window.location.href = "/Login";
      }
    } catch (err) {
      console.error(err);
      setMsg("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>{step === "form" ? "Create Account" : "Verify OTP"}</h2>

        {msg && (
          <p style={{ color: "yellow", marginBottom: "10px", fontSize: "0.9rem" }}>
            {msg}
          </p>
        )}

        {step === "form" && (
          <form onSubmit={handleRegister}>
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
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <span className="icon">📱</span>
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

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="login-text">
              Already have an account? <a href="/Login">Login</a>
            </p>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <span className="icon">🔢</span>
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
