import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function handle(){
    navigate("/events");
  }
  return (
    <nav className="navbar">
      <h1 className="logo">EventHub</h1>
      <ul className="nav-links">
        <li onClick={()=>{navigate("/")}}>Home</li>
        <li onClick={handle}>Events</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
