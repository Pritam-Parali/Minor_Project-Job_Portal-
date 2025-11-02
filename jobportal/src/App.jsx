import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CompanySlider from "./components/CompanySlider";
import About from "./components/About";
import Job from "./components/Job";
import Apply from "./components/Apply";
import Contactus from "./components/Contactus";
import Myprofile from "./components/Myprofile";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard"; // ✅ from HEAD
import Form from "./components/Form.jsx"; // ✅ from sayan

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <CompanySlider />
            </>
          }
        />

        {/* Other pages */}
        <Route path="/About" element={<About />} />
        <Route path="/Job" element={<Job />} />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/Myprofile" element={<Myprofile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Form" element={<Form />} />

        {/* ✅ Admin-only route */}
        <Route
          path="/admin-dashboard"
          element={
            localStorage.getItem("LoggedIn") &&
            localStorage.getItem("userType") === "Admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
