import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import jobnest from "../assets/jobnest.png";
import "./Navbar.css";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.userType === "Admin";

  // hide navbar on login/register
  const hideNavbar =
    location.pathname === "/Login" ||
    location.pathname === "/Register";

  useEffect(() => {
    setIsLogged(Boolean(localStorage.getItem("token")));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogged(false);
    setMenuOpen(false);
    navigate("/");
  };

  if (hideNavbar) return null;

  const navBtn =
    "px-3 py-1 rounded-md text-lg font-medium text-white no-underline hover:no-underline " +
    "transition-all duration-200 hover:bg-blue-700/40 hover:scale-[1.05]";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-sky-400 to-blue-600 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* ================= TOP BAR ================= */}
        <div className="h-[52px] flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-6">
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src={jobnest}
                alt="logo"
                className="h-8 w-8 rounded-full border border-white/70"
              />
            </NavLink>

            {/* DESKTOP MENU */}
            <nav className="hidden md:flex gap-3">
              <NavLink to="/" className={navBtn}>Home</NavLink>
              <NavLink to="/About" className={navBtn}>About</NavLink>
              <NavLink to="/Job" className={navBtn}>Jobs</NavLink>
            </nav>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* DESKTOP ONLY */}
            <div className="hidden md:flex items-center gap-4">
              {isLogged ? (
                <>
                  {isAdmin && (
                    <NavLink to="/admin/dashboard" className={navBtn}>
                      Admin
                    </NavLink>
                  )}

                  <NavLink to="/Profile" className={navBtn}>
                    Profile
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="logout-btn"
                    style={{
                      borderRadius: "9999px",
                      minWidth: "10px",
                      height: "32px",
                      padding: "0 16px",
                    }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <NavLink
                  to="/Login"
                  className="
                    inline-flex items-center justify-center
                    h-[32px] min-w-[110px]
                    px-6 rounded-full
                    bg-white text-blue-700 text-base font-semibold
                    shadow-md transition hover:bg-blue-50 hover:scale-[1.05]
                  "
                >
                  Login
                </NavLink>
              )}
            </div>

            {/* MOBILE ☰ */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white text-2xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* ================= MOBILE DROPDOWN ================= */}
        {menuOpen && (
          <div className="md:hidden mt-2 rounded-none bg-gradient-to-r from-blue-800 to-blue-900 backdrop-blur p-3 space-y-4 flex flex-col items-center">

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
                  to="/Profile"
                  onClick={() => setMenuOpen(false)}
                  className={navBtn}
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="logout-btn"
                  style={{ minWidth: "110px" }}
                >
                  Log out
                </button>
              </>
            ) : (
              <NavLink
                to="/Login"
                onClick={() => setMenuOpen(false)}
                className="
                  inline-flex items-center justify-center
                  h-[34px] min-w-[110px]
                  px-6 rounded-full
                  bg-white text-blue-700 font-semibold
                  shadow-md hover:bg-blue-50 transition
                "
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
