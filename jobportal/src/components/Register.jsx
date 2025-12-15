import React, { useState } from "react";
import "./Register.css";
import { toast } from "react-toastify";

const Register = () => {
  const [step, setStep] = useState("form"); // form | otp
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userType: "User",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // STEP 1 → Register & send OTP
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userType: formData.userType,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
      } else {
        toast.success("OTP sent to your email 📧");
        setStep("otp");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 → Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        toast.error(data.message || "OTP verification failed");
      } else {
        toast.success("Account verified successfully 🎉");
        setTimeout(() => {
          window.location.href = "/Login";
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error verifying OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>{step === "form" ? "Create Account" : "Verify OTP"}</h2>

        {step === "form" && (
          <form onSubmit={handleRegister}>

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

            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="👤 Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="📧 Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="phone"
                placeholder="📞 Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="🔒 Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="🔒 Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp}>
            <div className="input-group">
              <input
                type="text"
                placeholder="🔑 Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        <p style={{ marginTop: "16px", textAlign: "center" }}>
          Already have an account?{" "}
          <a
            href="/Login"
            style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
