import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ onOpenModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCustomerLoggedIn = Boolean(localStorage.getItem('customerId') && localStorage.getItem('token'));
  const isMechanicLoggedIn = Boolean(localStorage.getItem('mechanicId') || localStorage.getItem('mechanicToken'));
  const isAdminLoggedIn = Boolean(localStorage.getItem('adminToken'));

  const handleCustomerLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleNavClick = (sectionId, path = '/') => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(path);
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const triggerModal = (modalId) => {
    if (onOpenModal) {
      onOpenModal(modalId);
    } else {
      window.dispatchEvent(new CustomEvent('openModal', { detail: modalId }));
    }
  };

  return (
    <header className="header" id="header">
      <div className="container header-container">
        <Link to="/" className="logo-link" aria-label="Mechze Home" onClick={() => handleNavClick('hero', '/')}>
          <img src="/mechze-logo.jpg" alt="Mechze Logo" className="brand-logo-img" />
        </Link>

        <nav className="nav-wrapper">
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`} id="nav-menu">
            <li>
              <a href="#hero" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('hero', '/'); }}>Home</a>
            </li>
            <li>
              <a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('about', '/'); }}>About Us</a>
            </li>
            <li>
              <a href="#why-choose" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('why-choose', '/'); }}>Why Choose Mechze</a>
            </li>
            <li>
              <a href="#how-it-works" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('how-it-works', '/'); }}>How It Works</a>
            </li>
            <li>
              <a href="#mechanics" className="nav-link" onClick={(e) => { e.preventDefault(); handleNavClick('mechanics', '/'); }}>For Mechanics</a>
            </li>

            {isCustomerLoggedIn ? (
              <>
                <li><Link to="/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link></li>
                <li><Link to="/profile" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Profile</Link></li>
                <li>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleCustomerLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : isMechanicLoggedIn ? (
              <>
                <li><Link to="/mechanic/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link></li>
                <li>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleCustomerLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : isAdminLoggedIn ? (
              <>
                <li><Link to="/admin/dashboard" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Admin</Link></li>
                <li>
                  <button type="button" className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleCustomerLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
                <li><Link to="/Userregister" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Register</Link></li>
              </>
            )}
          </ul>
        </nav>

        <div className="header-actions">
          <button className="btn btn-primary" onClick={() => triggerModal('downloadModal')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download App
          </button>

          <button className="hamburger" id="hamburger" aria-label="Toggle navigation menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
