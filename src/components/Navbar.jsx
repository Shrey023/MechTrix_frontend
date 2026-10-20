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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isCustomerLoggedIn = Boolean(localStorage.getItem('customerId') && localStorage.getItem('token'));

  const handleCustomerLogout = () => {
    localStorage.removeItem('customerId');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    navigate('/');
  };

  // Handle smooth scroll to sections
  const handleHashScroll = (e, hash) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation, then scroll
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // ESC key handler for both modal and sidebar
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowDownloadModal(false);
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Body scroll lock when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  // Close sidebar on link click
  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo" aria-label="Mechze Home">
          <img src={mechzeLogo} alt="Mechze" className="logo-img" />
        </Link>

        {/* Hamburger Button - Mobile Only */}
        <button 
          className="hamburger"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={sidebarOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link></li>
          <li>
            <a 
              href="#why-choose" 
              onClick={(e) => handleHashScroll(e, '#why-choose')}
              className={location.hash === '#why-choose' ? 'active' : ''}
            >
              Why Choose Mechze
            </a>
          </li>
          <li>
            <a 
              href="#how-it-works" 
              onClick={(e) => handleHashScroll(e, '#how-it-works')}
              className={location.hash === '#how-it-works' ? 'active' : ''}
            >
              How It Works
            </a>
          </li>
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

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={handleLinkClick}>
            <img src={mechzeLogo} alt="Mechze" />
          </Link>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={handleLinkClick}>
            Home
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={handleLinkClick}>
            About Us
          </Link>
          <a 
            href="#why-choose" 
            onClick={(e) => { handleHashScroll(e, '#why-choose'); handleLinkClick(); }}
            className={location.hash === '#why-choose' ? 'active' : ''}
          >
            Why Choose Mechze
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => { handleHashScroll(e, '#how-it-works'); handleLinkClick(); }}
            className={location.hash === '#how-it-works' ? 'active' : ''}
          >
            How It Works
          </a>
          <Link to="/mechanic/login" className={location.pathname === '/mechanic/login' ? 'active' : ''} onClick={handleLinkClick}>
            For Mechanics
          </Link>

          {isCustomerLoggedIn ? (
            <>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''} onClick={handleLinkClick}>
                Dashboard
              </Link>
              <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''} onClick={handleLinkClick}>
                Profile
              </Link>
            </>
          ) : (
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''} onClick={handleLinkClick}>
              Login
            </Link>
          )}
        </nav>

        <div className="sidebar-footer">
          {isCustomerLoggedIn ? (
            <button 
              type="button" 
              className="sidebar-btn sidebar-btn-logout" 
              onClick={() => { handleCustomerLogout(); setSidebarOpen(false); }}
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => { setShowDownloadModal(true); setSidebarOpen(false); }} 
              className="sidebar-btn"
            >
              Download App
            </button>
          )}
        </div>
      </aside>

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
            background: 'var(--mz-surface-container)',
            border: '1px solid var(--mz-outline-variant)',
            borderRadius: 'var(--mz-r-card)',
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
              color: 'var(--mz-on-surface-variant)',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}>✕</button>

            <h3 style={{
              fontFamily: 'var(--mz-font-display)',
              fontSize: '1.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              textAlign: 'center',
              color: 'var(--mz-on-surface)',
            }}>Download Mechze Apps</h3>

            <p style={{ color: 'var(--mz-on-surface-variant)', marginBottom: '2rem', fontSize: '0.95rem', textAlign: 'center' }}>
              Get the Mechze app on Google Play
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              
              {/* Customer App */}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--mz-font-display)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--mz-primary)',
                  marginBottom: '1rem',
                }}>FOR VEHICLE OWNERS</div>
                
                <h4 style={{
                  fontFamily: 'var(--mz-font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: 'var(--mz-on-surface)',
                }}>Customer App</h4>

                <div style={{ marginBottom: '1.5rem' }}>
                  <img src={customerQR} alt="Customer App QR" style={{ width: '150px', height: '150px', border: '2px solid var(--mz-outline-variant)', borderRadius: 'var(--mz-r-field)' }} />
                  <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--mz-on-surface-variant)' }}>Scan QR to download</p>
                </div>

                <a 
                  href="https://play.google.com/store/apps/details?id=com.mechze.customer"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'var(--mz-inverse-surface)',
                    color: 'var(--mz-inverse-on-surface)',
                    padding: '10px 20px',
                    borderRadius: 'var(--mz-r-pill)',
                    textDecoration: 'none',
                    fontFamily: 'var(--mz-font-body)',
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
                  fontFamily: 'var(--mz-font-display)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--mz-primary)',
                  marginBottom: '1rem',
                }}>FOR MECHANICS & GARAGES</div>
                
                <h4 style={{
                  fontFamily: 'var(--mz-font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: 'var(--mz-on-surface)',
                }}>Partner App</h4>

                <div style={{ marginBottom: '1.5rem' }}>
                  <img src={mechanicQR} alt="Mechanic App QR" style={{ width: '150px', height: '150px', border: '2px solid var(--mz-outline-variant)', borderRadius: 'var(--mz-r-field)' }} />
                  <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--mz-on-surface-variant)' }}>Scan QR to download</p>
                </div>

                <a 
                  href="https://play.google.com/store/apps/details?id=com.shrey_r.mechanicapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'var(--mz-inverse-surface)',
                    color: 'var(--mz-inverse-on-surface)',
                    padding: '10px 20px',
                    borderRadius: 'var(--mz-r-pill)',
                    textDecoration: 'none',
                    fontFamily: 'var(--mz-font-body)',
                  }}>
                  <span style={{ fontSize: '1.3rem' }}>🔧</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.65rem' }}>GET IT ON</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Google Play</div>
                  </div>
                </a>
              </div>

            </div>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--mz-on-surface-variant)' }}>
              Press <kbd style={{ background: 'var(--mz-surface-highest)', padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace', color: 'var(--mz-on-surface)' }}>ESC</kbd> to close
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
