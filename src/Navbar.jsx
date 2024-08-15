import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container" style={{marginTop:"10px"}}>
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <div className="home-button" style={{marginTop:"5px"}}>
        <Link to="/" className="home-link">
          HOME
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;