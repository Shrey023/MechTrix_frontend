/**
 * Home.jsx - Complete Landing Page
 * Updated: ESC key support, reduced image sizes, no duplicate footer (universal footer used)
 * Using shared Navbar component only - Footer is rendered by App.jsx layout
 * Images used: app-mockup.png (300px max), customer-qr.png, mechanic-qr.png
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Home.css';

// Import only required images
import appMockup from '../assets/app-mockup.png';
import customerQR from '../assets/customer-qr.png';
import mechanicQR from '../assets/mechanic-qr.png';

const Home = () => {
  // Modal states
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // Form states
  const [bookingForm, setBookingForm] = useState({
    vehicleType: '',
    service: '',
    location: '',
    phone: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const [joinForm, setJoinForm] = useState({
    name: '',
    mobile: '',
    specialization: '',
    city: ''
  });
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  // ESC key handler for all modals
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowBookingModal(false);
        setShowCustomerModal(false);
        setShowPartnerModal(false);
        setShowJoinModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setShowBookingModal(false);
      setBookingForm({ vehicleType: '', service: '', location: '', phone: '' });
    }, 3000);
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    setJoinSubmitted(true);
    setTimeout(() => {
      setJoinSubmitted(false);
      setShowJoinModal(false);
      setJoinForm({ name: '', mobile: '', specialization: '', city: '' });
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="home-page">
      
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="hero">
        
        {/* Kicker */}
        <div className="hero-kicker">
          <span className="hero-kicker-line" />
          <span className="hero-kicker-text">Simplified Auto Repair Platform</span>
          <span className="hero-kicker-line" />
        </div>

        <h1 className="hero-title">
          Your Trusted Mechanic,<br/>Just a Few Taps Away.
        </h1>

        <p className="hero-subtitle">
          Mechze makes vehicle repair and servicing simple, convenient, and transparent.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons">
          <button 
            onClick={() => setShowBookingModal(true)}
            className="hero-btn">
            Book a Mechanic
          </button>

          <Link to="/nearby" style={{ textDecoration: 'none' }}>
            <button className="hero-btn hero-btn-secondary">
              Find Mechanic
            </button>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ABOUT MECHZE SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="section section-bg2">
        <div className="about-grid">
          
          <div className="about-content">
            <div className="section-kicker">
              <span className="section-kicker-line" />
              <span className="section-kicker-text">About Mechze</span>
            </div>

            <h2>
              Making Vehicle Repair Simple
            </h2>

            <p>
              Mechze is built to make finding and booking a mechanic easier. We connect vehicle owners with mechanics
              through a simple digital platform, making the repair and servicing experience more convenient.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <span className="about-feature-icon">✓</span>
                <span className="about-feature-text">Simple Navigation</span>
              </div>
              <div className="about-feature">
                <span className="about-feature-icon">✓</span>
                <span className="about-feature-text">Clear Process</span>
              </div>
            </div>
          </div>

          <div className="about-image">
            <img src={appMockup} alt="Mechze App" />
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHY CHOOSE MECHZE
          ═══════════════════════════════════════════════════════ */}
      <section className="section section-center">
        <div className="section-kicker">
          <span className="section-kicker-line" />
          <span className="section-kicker-text">Key Advantages</span>
          <span className="section-kicker-line" />
        </div>

        <h2 className="section-title">
          Why Choose Mechze?
        </h2>

        <p className="section-subtitle">
          A simple, smart, and digital approach to modern vehicle care.
        </p>

        <div className="features-grid">
          {[
            { icon: 'smartphone', title: 'Easy Booking', desc: 'Book a mechanic without the hassle.' },
            { icon: 'search', title: 'Transparent Process', desc: 'Keep the repair process clear and easy to understand.' },
            { icon: 'settings', title: 'Convenient Service', desc: 'Get vehicle repair assistance through a simple digital platform.' },
            { icon: 'devices', title: 'Digital Experience', desc: 'Manage your mechanic booking and service information digitally.' },
            { icon: 'commute', title: 'Multiple Vehicle Services', desc: 'Access different repair and servicing requirements through one platform.' },
            { icon: 'build', title: 'Reliable Mechanic Connection', desc: 'Find mechanics based on your vehicle\'s service needs.' },
          ].map((item, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon"><span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span></div>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW MECHZE WORKS
          ═══════════════════════════════════════════════════════ */}
      <section className="section section-bg2 section-center">
        <div className="section-kicker">
          <span className="section-kicker-line" />
          <span className="section-kicker-text">Simple 3-Step Process</span>
          <span className="section-kicker-line" />
        </div>

        <h2 className="section-title">
          How Mechze Works
        </h2>

        <p className="section-subtitle">
          Get your vehicle serviced in three effortless steps.
        </p>

        <div className="how-grid">
          {[
            { num: '01', title: 'Request a Service', desc: 'Tell us about your vehicle problem or select the required service.' },
            { num: '02', title: 'Connect With a Mechanic', desc: 'Find a suitable mechanic for your requirement.' },
            { num: '03', title: 'Get Your Vehicle Serviced', desc: 'Get the repair or servicing completed and manage the process through Mechze.' },
          ].map((step, idx) => (
            <div key={idx} className="how-card">
              <div className="how-number">{step.num}</div>
              <h3 className="how-title">{step.title}</h3>
              <p className="how-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DOWNLOAD NOW SECTION (REDUCED SIZE)
          ═══════════════════════════════════════════════════════ */}
      <section className="download-section">
        <h2>
          Download Now
        </h2>

        <div className="download-grid">
          
          {/* Customer App */}
          <div onClick={() => setShowCustomerModal(true)} className="download-card" tabIndex={0} role="button" onKeyDown={(e) => e.key === 'Enter' && setShowCustomerModal(true)}>
            <div className="download-icon"><span className="material-symbols-outlined" aria-hidden="true">smartphone</span></div>
            <div className="download-label">User</div>
            <h3 className="download-title">Customer App</h3>
            <button className="download-btn">Download</button>
          </div>

          {/* Mechanic App */}
          <div onClick={() => setShowPartnerModal(true)} className="download-card" tabIndex={0} role="button" onKeyDown={(e) => e.key === 'Enter' && setShowPartnerModal(true)}>
            <div className="download-icon"><span className="material-symbols-outlined" aria-hidden="true">build</span></div>
            <div className="download-label">Partner</div>
            <h3 className="download-title">Mechanic App</h3>
            <button className="download-btn">Download</button>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PARTNER WITH MECHZE (WITHOUT IMAGE)
          ═══════════════════════════════════════════════════════ */}
      <section className="partner-section">
        <div className="partner-content">
          
          <h2>
            Partner With Mechze
          </h2>

          <h3>
            Are You a Professional Mechanic or Garage Owner?
          </h3>

          <p>
            Expand your reach and boost your income. Mechze connects skilled mechanics directly with vehicle owners
            who need fast, reliable repairs and roadside servicing.
          </p>

          <div className="partner-benefits">
            {[
              { icon: '✓', text: 'Consistent Job Flow — Receive real-time service requests nearby' },
              { icon: '✓', text: 'Transparent Earnings — Instant payouts with low platform fees' },
              { icon: '✓', text: 'Flexible Schedule — Choose when and where you accept repair jobs' },
            ].map((item, idx) => (
              <div key={idx} className="partner-benefit">
                <span className="partner-benefit-icon">{item.icon}</span>
                <p className="partner-benefit-text">{item.text}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowJoinModal(true)}
            className="partner-cta">
            Join Mechze Now →
          </button>

          <p className="partner-note">
            Free registration • Instant verification
          </p>
        </div>
      </section>

      </div>

      {/* ═══════════════════════════════════════════════════════
          MODALS
          ═══════════════════════════════════════════════════════ */}
      
      {/* Booking Modal */}
      {showBookingModal && (
        <div onClick={() => setShowBookingModal(false)} className="modal-overlay">
          <div onClick={(e) => e.stopPropagation()} className="modal-content">
            <button onClick={() => setShowBookingModal(false)} className="modal-close">✕</button>

            <h3 className="modal-title">Book a Mechanic</h3>
            <p className="modal-subtitle">Tell us your vehicle details to get started.</p>

            <form onSubmit={handleBookingSubmit} className="modal-form">
              <div className="modal-form-group">
                <label className="modal-label">Vehicle Type</label>
                <select 
                  value={bookingForm.vehicleType}
                  onChange={(e) => setBookingForm({...bookingForm, vehicleType: e.target.value})}
                  required
                  className="modal-select">
                  <option value="">Select vehicle type</option>
                  <option value="car">Car / Four Wheeler</option>
                  <option value="two-wheeler">Two Wheeler / Motorcycle</option>
                  <option value="commercial">Commercial Vehicle</option>
                </select>
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Required Service / Issue</label>
                <input 
                  type="text"
                  value={bookingForm.service}
                  onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                  required
                  className="modal-input" />
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Location / City</label>
                <input 
                  type="text"
                  value={bookingForm.location}
                  onChange={(e) => setBookingForm({...bookingForm, location: e.target.value})}
                  required
                  className="modal-input" />
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Phone Number</label>
                <input 
                  type="tel"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  required
                  className="modal-input" />
              </div>

              <button type="submit" className="modal-submit">Submit Booking Request</button>

              {bookingSubmitted && (
                <p className="modal-success">
                  ✓ Booking request submitted! Downloading Mechze app gives live status updates.
                </p>
              )}
            </form>

            <p className="modal-esc">
              Press <kbd className="modal-kbd">ESC</kbd> to close
            </p>
          </div>
        </div>
      )}

      {/* Customer App Modal */}
      {showCustomerModal && (
        <div onClick={() => setShowCustomerModal(false)} className="modal-overlay">
          <div onClick={(e) => e.stopPropagation()} className="modal-content modal-content-center">
            <button onClick={() => setShowCustomerModal(false)} className="modal-close">✕</button>

            <div className="modal-qr-label">For Vehicle Owners</div>

            <h3 className="modal-title">Download Mechze Customer App</h3>

            <p className="modal-subtitle">
              Book vehicle repair, inspection, and servicing in a few taps.
            </p>

            <div className="modal-qr-container">
              <img src={customerQR} alt="Customer App QR" className="modal-qr-img" />
              <p className="modal-qr-text">Scan QR to download Customer App</p>
            </div>

            <a 
              href="https://play.google.com/store/apps/details?id=com.mechze.customer"
              target="_blank"
              rel="noopener noreferrer"
              className="modal-playstore-link">
              <span className="modal-playstore-icon">▶</span>
              <div>
                <div className="modal-playstore-text-small">GET IT ON</div>
                <div className="modal-playstore-text-large">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Partner App Modal */}
      {showPartnerModal && (
        <div onClick={() => setShowPartnerModal(false)} className="modal-overlay">
          <div onClick={(e) => e.stopPropagation()} className="modal-content modal-content-center">
            <button onClick={() => setShowPartnerModal(false)} className="modal-close">✕</button>

            <div className="modal-qr-label">For Mechanics</div>

            <h3 className="modal-title">Download Mechze Partner App</h3>

            <p className="modal-subtitle">
              Accept service requests, track customer locations, and manage repair jobs.
            </p>

            <div className="modal-qr-container">
              <img src={mechanicQR} alt="Mechanic App QR" className="modal-qr-img" />
              <p className="modal-qr-text">Scan QR to download Mechanic App</p>
            </div>

            <a 
              href="https://play.google.com/store/apps/details?id=com.shrey_r.mechanicapp"
              target="_blank"
              rel="noopener noreferrer"
              className="modal-playstore-link">
              <span className="modal-playstore-icon">▶</span>
              <div>
                <div className="modal-playstore-text-small">GET IT ON</div>
                <div className="modal-playstore-text-large">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Join Mechanic Modal */}
      {showJoinModal && (
        <div onClick={() => setShowJoinModal(false)} className="modal-overlay">
          <div onClick={(e) => e.stopPropagation()} className="modal-content">
            <button onClick={() => setShowJoinModal(false)} className="modal-close">✕</button>

            <h3 className="modal-title">Join Mechze as a Mechanic</h3>
            <p className="modal-subtitle">Connect with vehicle owners seeking repair & servicing.</p>

            <form onSubmit={handleJoinSubmit} className="modal-form">
              <div className="modal-form-group">
                <label className="modal-label">Full Name / Garage Name</label>
                <input 
                  type="text"
                  value={joinForm.name}
                  onChange={(e) => setJoinForm({...joinForm, name: e.target.value})}
                  required
                  className="modal-input" />
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Mobile Number</label>
                <input 
                  type="tel"
                  value={joinForm.mobile}
                  onChange={(e) => setJoinForm({...joinForm, mobile: e.target.value})}
                  required
                  className="modal-input" />
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Specialization / Expertise</label>
                <select 
                  value={joinForm.specialization}
                  onChange={(e) => setJoinForm({...joinForm, specialization: e.target.value})}
                  required
                  className="modal-select">
                  <option value="">Select primary service area</option>
                  <option value="car-repair">Car Mechanical Repair</option>
                  <option value="two-wheeler">Two-Wheeler Repair</option>
                  <option value="electrical">Auto Electricals & Battery</option>
                  <option value="servicing">General Servicing & Maintenance</option>
                </select>
              </div>

              <div className="modal-form-group">
                <label className="modal-label">Service City / Area</label>
                <input 
                  type="text"
                  value={joinForm.city}
                  onChange={(e) => setJoinForm({...joinForm, city: e.target.value})}
                  required
                  className="modal-input" />
              </div>

              <button type="submit" className="modal-submit">Submit Application</button>

              {joinSubmitted && (
                <p className="modal-success">
                  ✓ Application submitted! Our team will get in touch with you shortly.
                </p>
              )}
            </form>

            <p className="modal-esc">
              Press <kbd className="modal-kbd">ESC</kbd> to close
            </p>
          </div>
        </div>
      )}

    </>
  );
};

export default Home;
