import React from "react";
import Navbar from "./Navbar";
import "./About.css";
import together from "../assets/together.jpeg";
const About = () => {
  return (
    <>
      <Navbar />
      <section className="section1">
        <div className="Heading1">
          <h1 className="upperpart">
            About<span className="span">Jobportal</span>
          </h1>
          <p className="lowerpart">
            Empowering careers and connecting talent with opportunity since 2025{" "}
          </p>
        </div>
      </section>

      <section className="section2">
        <div className="outerdiv">
          <div className="inner_left">
            <h3 className="heading3">Our Story</h3>
            <p className="para">
              JobNest was born from a simple yet powerful idea: to revolutionize
              how people find jobs and how companies discover talent. Founded in
              2025 by a team of 5 tech enthusiasts, we recognized the gap
              between traditional job searching methods and the modern digital
              world.
              <br />
              <br />
              Our platform combines cutting-edge technology with human insight
              to create meaningful connections between job seekers and
              employers. We believe that the right opportunity can transform
              lives, and the right talent can transform businesses.
              <br />
              <br />
              Today, we're proud to serve over 45,000 job seekers and 850+
              partner companies worldwide, with a success rate that speaks to
              our commitment to quality matches and lasting career
              relationships.
            </p>
          </div>
        <div className="inner_right">
            <img src={together} alt="image" className="image"></img>
        </div>
        </div>
      </section>



    </>
  );
};
export default About;
