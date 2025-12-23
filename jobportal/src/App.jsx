// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Form from "./components/Form.jsx";
import AdminDashboard from "./admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import MyJobApplicants from "./components/MyJobApplicants";


function App() {
  return (
    <Router>
      {/* ToastContainer must be mounted once at app root */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Navbar should always be visible */}
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

        {/* PROTECTED: Job page requires valid JWT */}
        <Route
          path="/Job"
          element={
            <ProtectedRoute>
              <Job />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/Myprofile" element={<Myprofile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/my-job-applicants" element={<MyJobApplicants />} />

      </Routes>
    </Router>
  );
}

export default App;
