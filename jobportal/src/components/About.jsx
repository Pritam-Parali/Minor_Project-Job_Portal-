import React from "react";
import Navbar from "./Navbar";
import './About.css';

const About = () =>{
    return (
        <>
            <Navbar/>
            <div>
            
                     <div className="Heading">About Us</div>
                     <br></br>

            <div className="para_1">
            Welcome to JobNest – a platform created by a passionate team of 5 members with the goal of bridging the gap between students, graduates, and career opportunities.   
            Our mission is simple:
            * To help students and job seekers connect with the right opportunities.
            * To provide recruiters with an easy and efficient way to discover talented candidates.</div>
<br></br>
<div className="para_2">

This portal is designed with a user-friendly interface where:

1)Job seekers can create profiles, upload resumes, and apply to relevant openings.

2)Employers can post job listings, filter applicants, and find the best talent.

3)Students & freshers get a dedicated space to explore internships, part-time jobs, and entry-level roles.

We believe in empowering individuals by providing them with the right opportunities at the right time. Our vision is to make job hunting stress-free, transparent, and accessible for everyone in our college community and beyond.

Together, we aim to build a platform that grows with you and supports you in every step of your career journey.
                </div>
            </div>
        </>
    )
}
export default About;