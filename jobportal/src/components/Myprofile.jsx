import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./Myprofile.css";

const Myprofile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/profile/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (error)
    return <div className="profile-message error">{error}</div>;

  if (!user)
    return <div className="profile-message">Loading profile...</div>;

  return (
    <>

      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">My Profile</h2>

          <div className="profile-field">
            <label>Username</label>
            <input type="text" value={user.username} disabled />
          </div>

          <div className="profile-field">
            <label>Email</label>
            <input type="text" value={user.email} disabled />
          </div>

          <div className="profile-field">
            <label>Mobile Number</label>
            <input type="text" value={user.phone} disabled />
          </div>

          <p className="profile-note">
            Your profile details are read-only
          </p>
        </div>
      </div>
    </>
  );
};

export default Myprofile;
