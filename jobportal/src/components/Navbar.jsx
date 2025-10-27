import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import jobnest from "../assets/jobnest.png";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("LoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("LoggedIn");
    setIsLoggedIn(false);
    navigate("/Login");
  };

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
              <button className="search-button">🔍</button>
            </li>

            {!isLoggedIn ? (
              <li>
                <NavLink to="/Login" className="login">Login</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/Myprofile" className="myprofile">Profile</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
