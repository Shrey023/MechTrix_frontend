import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import mechzeLogo from '../assets/mechze-logo.jpg';
import customerQR from '../assets/customer-qr.png';
import mechanicQR from '../assets/mechanic-qr.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const isCustomerLoggedIn = Boolean(localStorage.getItem('customerId') && localStorage.getItem('token'));

  const handleCustomerLogout = () => {
    localStorage.removeItem('customerId');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowDownloadModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo" aria-label="Mechze Home">
          <img src={mechzeLogo} alt="Mechze" className="logo-img" />
        </Link>
        <ul className="nav-links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link></li>
          <li><Link to="/#why-choose" className={location.pathname === '/#why-choose' ? 'active' : ''}>Why Choose Mechze</Link></li>
          <li><Link to="/#how-it-works" className={location.pathname === '/#how-it-works' ? 'active' : ''}>How It Works</Link></li>
          <li><Link to="/mechanic/login" className={location.pathname === '/mechanic/login' ? 'active' : ''}>For Mechanics</Link></li>

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
              <li>
                <button onClick={() => setShowDownloadModal(true)} className="nav-cta">
                  Download App
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Download Modal */}
      {showDownloadModal && (
        <div onClick={() => setShowDownloadModal(false)} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'var(--color-bg2)',
            border: '1px solid rgba(131,68,23,0.3)',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '900px',
            width: '100%',
            position: 'relative',
          }}>
            <button onClick={() => setShowDownloadModal(false)} style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: 'var(--color-warm-gray)',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}>✕</button>

            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              textAlign: 'center',
            }}>Download Mechze Apps</h3>

            <p style={{ color: 'var(--color-warm-gray)', marginBottom: '2rem', fontSize: '0.95rem', textAlign: 'center' }}>
              Get the Mechze app on Google Play
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              
              {/* Customer App */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.85rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--color-brown-light)',
                  marginBottom: '1rem',
                }}>FOR VEHICLE OWNERS</div>
                
                <h4 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}>Customer App</h4>

                <div style={{ marginBottom: '1.5rem' }}>
                  <img src={customerQR} alt="Customer App QR" style={{ width: '150px', height: '150px', border: '2px solid rgba(131,68,23,0.2)', borderRadius: '6px' }} />
                  <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--color-warm-gray)' }}>Scan QR to download</p>
                </div>

                <a 
                  href="https://play.google.com/store/apps/details?id=com.mechze.customer"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: '#000',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontFamily: "'Barlow', sans-serif",
                  }}>
                  <span style={{ fontSize: '1.3rem' }}>▶</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.65rem' }}>GET IT ON</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Google Play</div>
                  </div>
                </a>
              </div>

              {/* Mechanic App */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.85rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--color-brown-light)',
                  marginBottom: '1rem',
                }}>FOR MECHANICS & GARAGES</div>
                
                <h4 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                }}>Partner App</h4>

                <div style={{ marginBottom: '1.5rem' }}>
                  <img src={mechanicQR} alt="Mechanic App QR" style={{ width: '150px', height: '150px', border: '2px solid rgba(131,68,23,0.2)', borderRadius: '6px' }} />
                  <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--color-warm-gray)' }}>Scan QR to download</p>
                </div>

                <a 
                  href="https://play.google.com/store/apps/details?id=com.shrey_r.mechanicapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: '#000',
                    color: '#fff',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontFamily: "'Barlow', sans-serif",
                  }}>
                  <span style={{ fontSize: '1.3rem' }}>🔧</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.65rem' }}>GET IT ON</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Google Play</div>
                  </div>
                </a>
              </div>

            </div>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-warm-gray)' }}>
              Press <kbd style={{ background: 'var(--color-bg3)', padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace' }}>ESC</kbd> to close
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
