import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import jobnest from "../assets/jobnest.png";
import "./Navbar.css";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.userType === "Admin";

  const hideNavbar =
    location.pathname === "/Login" || location.pathname === "/Register";

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogged(false);
    setMenuOpen(false);
    navigate("/");
  };

  if (hideNavbar) return null;

  const navBtn =
    "px-3 py-1 rounded-md text-lg font-medium text-white no-underline " +
    "transition-all duration-200 hover:bg-blue-700/40 hover:scale-[1.05]";

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-sky-400 to-blue-600 shadow-md">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-[52px] flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-6">
            <NavLink to="/" className="no-underline">
              <img
                src={jobnest}
                alt="logo"
                className="h-8 w-8 rounded-full border border-white"
              />
            </NavLink>

            <nav className="hidden md:flex gap-3">
              <NavLink to="/" className={navBtn}>Home</NavLink>
              <NavLink to="/About" className={navBtn}>About</NavLink>
              <NavLink to="/Job" className={navBtn}>Jobs</NavLink>
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {isLogged ? (
                <>
                  {isAdmin && (
                    <NavLink to="/admin/dashboard" className={navBtn}>
                      Admin
                    </NavLink>
                  )}
                  <NavLink to="/Myprofile" className={navBtn}>
                    Profile
                  </NavLink>
                  <button className="logout-btn" onClick={handleLogout}>
                    Log out
                  </button>
                </>
              ) : (
                <NavLink to="/Login" className="login-btn">
                  Login
                </NavLink>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-blue-900 p-4 flex flex-col items-center gap-4">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className={navBtn}>
              Home
            </NavLink>
            <NavLink to="/About" onClick={() => setMenuOpen(false)} className={navBtn}>
              About
            </NavLink>
            <NavLink to="/Job" onClick={() => setMenuOpen(false)} className={navBtn}>
              Jobs
            </NavLink>

            {isLogged ? (
              <>
                <NavLink
                  to="/Myprofile"
                  onClick={() => setMenuOpen(false)}
                  className={navBtn}
                >
                  Profile
                </NavLink>
                <button className="logout-btn" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <NavLink
                to="/Login"
                onClick={() => setMenuOpen(false)}
                className="login-btn"
              >
                Login
              </NavLink>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
