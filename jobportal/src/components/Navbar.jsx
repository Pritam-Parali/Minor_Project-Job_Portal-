// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import jobnest from "../assets/jobnest.png"; // adjust path if needed

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(Boolean(token));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogged(false);
    navigate("/Login");
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/About", label: "About" },
    { to: "/Job", label: "Job" },
    { to: "/Contactus", label: "Contact" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="bg-blue-600 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[70px]">
              {/* left: logo */}
              <div className="flex items-center">
                <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center">
                  <img
                    src={jobnest}
                    alt="Jobnest"
                    className="h-10 w-10 md:h-12 md:w-12 rounded-full shadow-lg object-cover"
                  />
                </NavLink>
              </div>

              {/* center: desktop links + search */}
              <div className="hidden md:flex md:items-center md:space-x-6 w-full justify-center">
                <nav className="flex items-center space-x-6">
                  {links.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md font-semibold text-sm ${isActive ? "text-white bg-blue-800 shadow-inner" : "text-white hover:bg-blue-500/70 transition transform"}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </nav>

                {/* search box */}
                <div className="ml-6 flex items-center bg-white rounded-md shadow-sm px-2 py-1">
                  <input
                    type="text"
                    placeholder="Type here to search"
                    className="w-64 focus:outline-none text-sm px-2 py-1"
                  />
                  <button aria-label="search" className="ml-2 bg-sky-200 hover:bg-sky-300 p-2 rounded-md">
                    🔍
                  </button>
                </div>
              </div>

              {/* right: profile/login */}
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex md:items-center md:space-x-3">
                  {isLogged ? (
                    <>
                      <NavLink
                        to="/Myprofile"
                        className="bg-white/10 text-white px-3 py-2 rounded-md font-medium hover:bg-white/20 transition"
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="bg-white text-blue-700 px-3 py-2 rounded-md font-medium hover:scale-105 transition"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/Login"
                        className="bg-sky-400 text-white px-3 py-2 rounded-md font-medium hover:scale-105 transition"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        to="/Register"
                        className="bg-white text-blue-700 px-3 py-2 rounded-md font-medium hover:scale-105 transition"
                      >
                        Register
                      </NavLink>
                    </>
                  )}
                </div>

                {/* mobile hamburger */}
                <div className="md:hidden">
                  <button
                    onClick={() => setOpen((s) => !s)}
                    aria-expanded={open}
                    aria-label="Toggle menu"
                    className="p-2 rounded-md text-white hover:bg-blue-700/80 focus:outline-none"
                  >
                    {open ? (
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* mobile panel */}
          <div className={`md:hidden bg-blue-600 ${open ? "block" : "hidden"} border-t border-blue-700`}>
            <div className="px-4 pt-3 pb-4 space-y-2">
              <div className="flex items-center bg-white rounded-md px-2 py-1">
                <input type="text" placeholder="Search" className="w-full text-sm px-2 py-1 focus:outline-none" />
                <button className="ml-2 bg-sky-200 p-2 rounded-md">🔍</button>
              </div>

              <nav className="space-y-1">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-md text-base font-medium text-white ${isActive ? "bg-blue-800" : "hover:bg-blue-500/70"}`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>

              <div className="pt-2 border-t border-blue-700 mt-2 flex flex-col gap-2">
                {isLogged ? (
                  <>
                    <NavLink to="/Myprofile" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-white bg-white/10">
                      My Profile
                    </NavLink>
                    <button onClick={() => { setOpen(false); handleLogout(); }} className="w-full text-left px-3 py-2 rounded-md bg-white text-blue-700">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/Login" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md bg-sky-400 text-white text-center">
                      Login
                    </NavLink>
                    <NavLink to="/Register" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md bg-white text-blue-700 text-center">
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* spacer to push content below fixed header */}
      <div className="h-[70px] md:h-16" aria-hidden="true" />
    </>
  );
}
