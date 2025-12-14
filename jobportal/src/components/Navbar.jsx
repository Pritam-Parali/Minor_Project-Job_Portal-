import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import jobnest from "../assets/jobnest.png";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (hideNavbar) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[64px] flex items-center justify-between">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src={jobnest} className="h-8 w-8 rounded-full" />
            <span className="font-semibold text-lg">JobNest</span>
          </NavLink>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/job">Jobs</NavLink>
            <NavLink to="/about">About</NavLink>
            {isLogged && <NavLink to="/profile">Profile</NavLink>}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {!isLogged ? (
              <NavLink
                to="/login"
                className="px-4 py-1.5 rounded-full border text-sm"
              >
                Login
              </NavLink>
            ) : (
              <button onClick={handleLogout} className="text-sm">
                Logout
              </button>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden mt-3 flex flex-col gap-3 pb-4 text-gray-700">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/job" onClick={() => setMenuOpen(false)}>Jobs</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
            {isLogged && (
              <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </NavLink>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
