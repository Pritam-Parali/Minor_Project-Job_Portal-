import React from "react";
import Navbar from "./Navbar";
import "./About.css";
import together from "../assets/together.jpeg";
import bappa from "../assets/personal_image/bappa.jpg";
import sayan from "../assets/personal_image/sayan.jpg";
import arpita from "../assets/personal_image/arpita.jpg";
import pritam from "../assets/personal_image/pritam.jpg";
import ali from "../assets/personal_image/ali_sir.jpg";

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

      <section className="section3">
        <h1 className="heading1">Our Values</h1>
        <p className="paragraph1">The principles that guide everything we do</p>
        <div className="outerdiv1">
          <div className="innerdiv1">
            <div className="innerinnerdiv">
              <i class="fas fa-bullseye"></i>
            </div>

            <div className="textpart">
              <h3 className="textpart_heading">Our Mission</h3>
              <br />
              <p className="textpart_paragraph">
                To connect talented individuals with their dream careers while
                helping companies find the perfect candidates.
              </p>
            </div>
          </div>

          <div className="innerdiv1">
            <div className="innerinnerdiv">
              <i class="fas fa-users"></i>
            </div>

            <div className="textpart">
              <h3 className="textpart_heading">Community First</h3>
              <br />
              <p className="textpart_paragraph">
                We believe in building a supportive community where job seekers and employers can thrive together
              </p>
            </div>
          </div>

          <div className="innerdiv1">
            <div className="innerinnerdiv">
              <i class="fas fa-medal"></i>
            </div>

            <div className="textpart">
              <h3 className="textpart_heading">High Quality</h3>
              <br />
              <p className="textpart_paragraph">
                We strive for excellence in everything we do, from our platform features to customer service
              </p>
            </div>
          </div>

          <div className="innerdiv1">
            <div className="innerinnerdiv">
              <i class="fas fa-globe"></i>
            </div>

            <div className="textpart">
              <h3 className="textpart_heading">Global Reach</h3>
              <br />
              <p className="textpart_paragraph">
                Connecting opportunities across the globe, making the world a smaller place for career growth. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 STARTING  */}

      <section className="section_4">
        <h3 className="heading_4">Meet Our Team</h3>
        <p className="paragraph_4">The passionate people behind JobPortal</p>
        <div className="div4">
          <div className="innerdiv4">
            <img src={bappa} alt="bappa"></img>
            <h3 className="h3">BAPPA BISWAS</h3>
          </div>

          <div className="innerdiv4">
            <img src={pritam} alt="pritam"></img>
            <h3 className="h3">PRITAM PARALI</h3>
          </div>

          <div className="innerdiv4">
            <img src={sayan} alt="SAYAN"></img>
            <h3 className="h3">SAYAN BISWAS</h3>
          </div>
          

        </div>
        <div className="div4">
          <div className="innerdiv4">
            <img src={arpita} alt="arpita"></img>
            <h3 className="h3">ARPITA ROY</h3>
          </div>
          <div className="innerdiv4">
            <img src={sayan} alt="SUPRIYA"></img>
            <h3 className="h3">SUPRIYA MATTABAR</h3>
          </div>
        </div>
        
      </section>
    </>
  );
};
export default About;
