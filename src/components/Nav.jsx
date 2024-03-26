import React from "react";
import "../styles/Nav.css"
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "../services/users.js";



function Nav() {

  let navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut(); // Call signOut to remove the token
      navigate("/"); // Navigate to login or any other appropriate path after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
    <nav className="loggedInNav">
      <NavLink to="/home" className="navTitles">Home</NavLink>
      <NavLink to="/db" className="navTitles">Dashboard</NavLink>
      <button className="signOutButton" onClick={handleLogout} >Sign Out</button>
    </nav>

    </div>
  );
}

export default Nav;
