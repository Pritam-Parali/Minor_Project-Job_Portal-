import React from "react";
import "../index.css";

import tcs from "../assets/tcs.jpg";
import wipro from "../assets/wipro.webp";
import amazon from "../assets/amazon.jpeg";
import google from "../assets/google.png";
import microsoft from "../assets/microsoft.jpg";

const companies = [
  { name: "TCS", logo: tcs },
  { name: "Wipro", logo: wipro },
  { name: "Amazon", logo: amazon },
  { name: "Google", logo: google },
  { name: "Microsoft", logo: microsoft },
];

const CompanySlider = () => {
  return (
    <div className="company-slider">
      <h2>Top Hiring Companies</h2>
      <div className="logo-track">
        {companies.concat(companies).map((company, index) => (
          <div className="logo-slide" key={index}>
            <img src={company.logo} alt={company.name} />
            <p>{company.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanySlider;
