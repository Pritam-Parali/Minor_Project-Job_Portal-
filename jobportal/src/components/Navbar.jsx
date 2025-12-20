import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import jobnest from "../assets/jobnest.png";

const Navbar = () => {
  // ✅ read token on first render (no flicker)
  const [isLogged, setIsLogged] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ hide navbar on auth pages (CAPITAL routes)
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
    "transition-all duration-200 " +
    "hover:bg-blue-700/40 hover:scale-[1.05]";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-sky-400 to-blue-600 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-10">

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

          {/* RIGHT (DESKTOP) */}
          <div className="flex items-center gap-4">

            {isLogged ? (
              <>
                {/* Profile */}
                <NavLink to="/Profile" className="hidden md:block">
                  <span className={navBtn}>Profile</span>
                </NavLink>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  style={{ borderRadius: "9999px", minWidth: "110px" }}
                  className="
                    hidden md:inline-flex items-center justify-center
                    h-[32px]
                    bg-red-500 text-white text-base
                    transition hover:bg-red-600 hover:scale-[1.05]
                  "
                >
                  Log out
                </button>
              </>
            ) : (
              /* ✅ IMPROVED LOGIN BUTTON */
              <NavLink
                to="/Login"
                className="
                  hidden md:inline-flex items-center justify-center
                  h-[32px] min-w-[110px]
                  px-6
                  rounded-full
                  bg-white
                  text-blue-700 text-base font-semibold
                  shadow-md
                  transition-all duration-200
                  hover:bg-blue-50 hover:scale-[1.05]
                "
              >
                Login
              </NavLink>
            )}

            {/* MOBILE MENU ICON */}
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
          <div className="md:hidden mt-2 rounded-None bg-gradient-to-r from-skyblue-900 via-blue-800 to-skyblue-900 backdrop-blur p-2 space-y-4 flex justify-center gap-4">

            <NavLink to="/" onClick={() => setMenuOpen(false)} className={navBtn}>Home</NavLink>
            <NavLink to="/About" onClick={() => setMenuOpen(false)} className={navBtn}>About</NavLink>
            <NavLink to="/Job" onClick={() => setMenuOpen(false)} className={navBtn}>Jobs</NavLink>

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
                  style={{ borderRadius: "9999px", minWidth: "110px" }}
                  className="
                    inline-flex items-center justify-center
                    h-[34px]
                    bg-red-500 text-white text-base
                    hover:bg-red-600 transition
                  "
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
                  px-6
                  rounded-full
                  bg-white text-blue-700 text-base font-semibold
                  shadow-md
                  hover:bg-blue-50 transition
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
