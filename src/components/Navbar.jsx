import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCustomerLoggedIn = Boolean(localStorage.getItem('customerId') && localStorage.getItem('token'));

  const handleCustomerLogout = () => {
    localStorage.removeItem('customerId');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" aria-label="Mechze Home">
        MECH<span className="logo-accent">ZE</span>
      </Link>
      <ul className="nav-links">
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>

        {isCustomerLoggedIn ? (
          <>
            <li><Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link></li>
            <li><Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link></li>
            <li>
              <button type="button" className="nav-cta nav-logout" onClick={handleCustomerLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link></li>
            <li><Link to="/Userregister" className="nav-cta">Get Started</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
