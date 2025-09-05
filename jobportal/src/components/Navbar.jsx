import React from "react";
import { NavLink } from "react-router-dom";
import search from "../assets/search-w.png"; 
import jobnest from '../assets/jobnest.png';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <nav>
          <ul>
            <li>
              <NavLink to="/" className="logo-link">
                <img src={jobnest} alt="Jobnest Logo" className="jobnest-logo" />
              </NavLink>
            </li>

            <li><NavLink to="/" className="nav">Home</NavLink></li>
            <li><NavLink to="/About" className="nav">About</NavLink></li>
            <li><NavLink to="/Job" className="nav">Job</NavLink></li>
            <li><NavLink to="/Contactus" className="nav">Contact</NavLink></li>
            
            <li className="search-box">
              <input type="text" placeholder="search" />
              <img src={search} alt="Search" className="logo" />
            </li>
            <li><NavLink to="/Myprofile" className={"myprofile"}>Profile</NavLink></li>
            <li><NavLink to="/Login" className={"login"}>Login</NavLink></li> 
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
