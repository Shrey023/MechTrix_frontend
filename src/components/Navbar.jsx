import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">MechTrix 🚗</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/USerRegister">Register</Link></li>
        {/* <li><Link to="/CustomerDashboard">Dashboard</Link></li> */}
        {/* <li><Link to="/MechanicLogin">Mlogin</Link></li>
        <li><Link to="/MechanicRegister">MRegister</Link></li> */}
        {/* Add more links as pages are created */}
      </ul>
    </nav>
  );
};

export default Navbar;
