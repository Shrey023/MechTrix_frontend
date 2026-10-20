import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import mechzeFooterLogo from '../assets/mechze-footer.jpg';
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
      <footer className="footer-wrapper">
        <div className="footer-content">
          
          {/* Brand */}
          <div className="footer-brand">
            <img src={mechzeFooterLogo} alt="Mechze" className="footer-logo" />
            <p>
              Mechze connects vehicle owners with mechanics through a simple, convenient, and transparent digital platform.
            </p>
          </div>

          {/* Company */}
          <div className="footer-column">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/nearby">Services</Link></li>
            </ul>
          </div>

          {/* Mechanics & Users */}
          <div className="footer-column">
            <h4>Mechanics & Users</h4>
            <ul className="footer-links">
              <li><Link to="/nearby">Book Service</Link></li>
              <li><Link to="/mechanic/login">For Mechanics</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li>
                <button onClick={() => setShowDownloadModal(true)}>Download App</button>
              </li>
            </ul>
          </div>

          {/* Legal & Policy */}
          <div className="footer-column">
            <h4>Legal & Policy</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => setShowPrivacyModal(true)}>Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => setShowTermsModal(true)}>Terms & Conditions</button>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2025 Mechze. Your Trusted Mechanic, Just a Few Taps Away.</p>
        </div>
      </footer>

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="modal-overlay" onClick={() => setShowDownloadModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowDownloadModal(false)}>✕</button>

            <h3 className="modal-title">Download Mechze Apps</h3>

            <p className="modal-subtitle">
              Get the Mechze app on Google Play
            </p>

            <div className="download-grid">
              
              {/* Customer App */}
              <div className="download-card">
                <div className="download-label">FOR VEHICLE OWNERS</div>
                
                <h4>Customer App</h4>

                <div className="qr-container">
                  <img src={customerQR} alt="Customer App QR" className="qr-image" />
                  <p className="qr-text">Scan QR to download</p>
                </div>

                <a 
                  href="https://play.google.com/store/apps/details?id=com.mechze.customer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="play-store-button">
                  <span className="play-store-icon">▶</span>
                  <div className="play-store-text">
                    <div className="play-store-label">GET IT ON</div>
                    <div className="play-store-name">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Mechanic App */}
              <div className="download-card">
                <div className="download-label">FOR MECHANICS & GARAGES</div>
                
                <h4>Partner App</h4>

                <div className="qr-container">
                  <img src={mechanicQR} alt="Mechanic App QR" className="qr-image" />
                  <p className="qr-text">Scan QR to download</p>
                </div>

                <a 
                  href="https://play.google.com/store/apps/details?id=com.shrey_r.mechanicapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="play-store-button">
                  <span className="play-store-icon">🔧</span>
                  <div className="play-store-text">
                    <div className="play-store-label">GET IT ON</div>
                    <div className="play-store-name">Google Play</div>
                  </div>
                </a>
              </div>

            </div>

            <p className="modal-footer">
              Press <kbd>ESC</kbd> to close
            </p>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="modal-overlay" onClick={() => setShowPrivacyModal(false)}>
          <div className="modal-container modal-container-narrow" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPrivacyModal(false)}>✕</button>

            <h3 className="modal-title">Privacy Policy</h3>

            <p className="policy-content policy-intro">
              At Mechze, we value your privacy. This policy outlines how we handle user information on our digital platform:
            </p>

            <div className="policy-content">
              <p>
                <strong>1. Information Collection:</strong> We collect essential contact information provided during service
                booking or contact requests to facilitate mechanic connection.
              </p>

              <p>
                <strong>2. Data Usage:</strong> Information is strictly used for vehicle servicing connection and platform
                communication. We do not sell or lease user data to third parties.
              </p>

              <p>
                <strong>3. Security:</strong> Standard security protocols are applied to safeguard user information submitted
                through our website and app.
              </p>
            </div>

            <p className="modal-footer">
              Press <kbd>ESC</kbd> to close
            </p>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="modal-container modal-container-narrow" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowTermsModal(false)}>✕</button>

            <h3 className="modal-title">Terms & Conditions</h3>

            <p className="policy-content policy-intro">
              Welcome to Mechze. By accessing our platform, you agree to the following standard terms:
            </p>

            <div className="policy-content">
              <p>
                <strong>1. Platform Role:</strong> Mechze acts as a digital platform connecting vehicle owners with mechanics
                for vehicle repair and servicing assistance.
              </p>

              <p>
                <strong>2. User Responsibilities:</strong> Users agree to provide accurate information when booking or
                submitting inquiries on the platform.
              </p>

              <p>
                <strong>3. Service Scope:</strong> Services are delivered according to availability and terms specified
                during booking requests.
              </p>
            </div>

            <p className="modal-footer">
              Press <kbd>ESC</kbd> to close
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
