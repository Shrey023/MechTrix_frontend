import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mechzeLogo from '../assets/mechze-logo.jpg';
import customerQR from '../assets/customer-qr.png';
import mechanicQR from '../assets/mechanic-qr.png';

const Footer = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowPrivacyModal(false);
        setShowTermsModal(false);
        setShowDownloadModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <footer style={{
        background: 'var(--color-bg, #0E0C0A)',
        borderTop: '1px solid rgba(131,68,23,0.2)',
        padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 5vw, 2rem)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <img src={mechzeLogo} alt="Mechze" style={{ height: '36px', width: 'auto' }} />
            </div>
            <p style={{ color: 'var(--color-warm-gray)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Mechze connects vehicle owners with mechanics through a simple, convenient, and transparent digital platform.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '1rem',
            }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/" style={{ color: 'var(--color-warm-gray)', fontSize: '0.95rem', transition: 'color 0.2s' }}>Home</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/about" style={{ color: 'var(--color-warm-gray)', fontSize: '0.95rem', transition: 'color 0.2s' }}>About Us</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/nearby" style={{ color: 'var(--color-warm-gray)', fontSize: '0.95rem', transition: 'color 0.2s' }}>Services</Link>
              </li>
            </ul>
          </div>

          {/* Mechanics & Users */}
          <div>
            <h4 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '1rem',
            }}>Mechanics & Users</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/nearby" style={{ color: 'var(--color-warm-gray)', fontSize: '0.95rem' }}>Book Service</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/mechanic/login" style={{ color: 'var(--color-warm-gray)', fontSize: '0.95rem' }}>For Mechanics</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <Link to="/login" style={{ color: 'var(--color-warm-gray)', fontSize: '0.95rem' }}>Login</Link>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <button onClick={() => setShowDownloadModal(true)} style={{ background: 'none', border: 'none', color: 'var(--color-warm-gray)', fontSize: '0.95rem', cursor: 'pointer', padding: 0, textAlign: 'left', fontFamily: 'inherit' }}>Download App</button>
              </li>
            </ul>
          </div>

          {/* Legal & Policy */}
          <div>
            <h4 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '1rem',
            }}>Legal & Policy</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <button onClick={() => setShowPrivacyModal(true)} style={{ background: 'none', border: 'none', color: 'var(--color-warm-gray)', fontSize: '0.95rem', cursor: 'pointer', padding: 0, textAlign: 'left', fontFamily: 'inherit' }}>Privacy Policy</button>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <button onClick={() => setShowTermsModal(true)} style={{ background: 'none', border: 'none', color: 'var(--color-warm-gray)', fontSize: '0.95rem', cursor: 'pointer', padding: 0, textAlign: 'left', fontFamily: 'inherit' }}>Terms & Conditions</button>
              </li>
            </ul>
          </div>

        </div>

        <div style={{
          borderTop: '1px solid rgba(131,68,23,0.15)',
          paddingTop: '2rem',
          textAlign: 'center',
        }}>
          <p style={{ color: 'var(--color-warm-gray)', fontSize: '0.9rem' }}>
            © 2025 Mechze. Your Trusted Mechanic, Just a Few Taps Away.
          </p>
        </div>
      </footer>

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

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div onClick={() => setShowPrivacyModal(false)} style={{
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
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}>
            <button onClick={() => setShowPrivacyModal(false)} style={{
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
              marginBottom: '1.5rem',
            }}>Privacy Policy</h3>

            <p style={{ color: 'var(--color-warm-gray)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              At Mechze, we value your privacy. This policy outlines how we handle user information on our digital platform:
            </p>

            <div style={{ color: 'var(--color-warm-gray)', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>1. Information Collection:</strong> We collect essential contact information provided during service
                booking or contact requests to facilitate mechanic connection.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                <strong>2. Data Usage:</strong> Information is strictly used for vehicle servicing connection and platform
                communication. We do not sell or lease user data to third parties.
              </p>

              <p>
                <strong>3. Security:</strong> Standard security protocols are applied to safeguard user information submitted
                through our website and app.
              </p>
            </div>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-warm-gray)' }}>
              Press <kbd style={{ background: 'var(--color-bg3)', padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace' }}>ESC</kbd> to close
            </p>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div onClick={() => setShowTermsModal(false)} style={{
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
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}>
            <button onClick={() => setShowTermsModal(false)} style={{
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
              marginBottom: '1.5rem',
            }}>Terms & Conditions</h3>

            <p style={{ color: 'var(--color-warm-gray)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Welcome to Mechze. By accessing our platform, you agree to the following standard terms:
            </p>

            <div style={{ color: 'var(--color-warm-gray)', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>1. Platform Role:</strong> Mechze acts as a digital platform connecting vehicle owners with mechanics
                for vehicle repair and servicing assistance.
              </p>

              <p style={{ marginBottom: '1rem' }}>
                <strong>2. User Responsibilities:</strong> Users agree to provide accurate information when booking or
                submitting inquiries on the platform.
              </p>

              <p>
                <strong>3. Service Scope:</strong> Services are delivered according to availability and terms specified
                during booking requests.
              </p>
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

export default Footer;
