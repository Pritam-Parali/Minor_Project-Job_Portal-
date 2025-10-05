import React from "react";
import "../index.css";
import bgImage from "../assets/home-bg.jpg";

const HeroSection = () => {
  return (
    <div
      className="hero-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-overlay">
        <h1>Your Dream Job Awaits</h1>
        <p>Find opportunities with top MNC companies around the globe.</p>
      </div>
    </div>
  );
};

export default HeroSection;
