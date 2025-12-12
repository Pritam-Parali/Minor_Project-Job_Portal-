// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      {/* Navbar should always be visible */}
      <Navbar />

      <Routes>
        {/* Home page: Hero section + MNC slider */}
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

        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/Myprofile" element={<Myprofile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
