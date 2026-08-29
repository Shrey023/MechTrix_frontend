import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ onOpenModal }) => {
  const triggerModal = (modalId) => {
    if (onOpenModal) {
      onOpenModal(modalId);
    } else {
      window.dispatchEvent(new CustomEvent('openModal', { detail: modalId }));
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                Simplified Auto Repair Platform
              </div>

              <h1 className="hero-title" style={{ color: '#ffffff', textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}>
                Your Trusted Mechanic, Just a Few Taps Away.
              </h1>
              <p className="hero-subtitle" style={{ color: '#ffffff', opacity: 0.95, textShadow: '0 1px 6px rgba(0, 0, 0, 0.8)' }}>
                Mechze makes vehicle repair and servicing simple, convenient, and transparent.
              </p>

              <div className="hero-ctas">
                <button className="btn btn-primary" onClick={() => triggerModal('bookingModal')}>
                  Book a Mechanic
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                <button className="btn btn-secondary" onClick={() => triggerModal('downloadModal')}>
                  Download App
                </button>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-image-card">
                <img src="/join-mechanic.png" alt="Mechanics inspecting vehicle engine bay" className="hero-img" />
              </div>

              <div className="hero-floating-badge">
                <div className="floating-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="floating-text">
                  <div className="title">Digital Booking Platform</div>
                  <div className="subtitle">Quick & Convenient Repair Assistance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Mechze */}
      <section className="section section-alt" id="about">
        <div className="container">
          <div className="about-card">
            <div className="about-text-content">
              <span className="section-tag">About Mechze</span>
              <h2 className="section-title">Making Vehicle Repair Simple</h2>
              <p className="about-paragraph">
                Mechze is built to make finding and booking a mechanic easier. We connect vehicle owners with mechanics
                through a simple digital platform, making the repair and servicing experience more convenient.
              </p>

              <div className="about-highlights">
                <div className="highlight-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Simple Navigation
                </div>
                <div className="highlight-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Clear Process
                </div>
              </div>
            </div>

            <div className="about-image-container">
              <img src="/bmw-ix-open-hood-facebook-share-image-1024x538.jpg" alt="Automotive Inspection" className="about-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Mechze */}
      <section className="section" id="why-choose">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Key Advantages</span>
            <h2 className="section-title">Why Choose Mechze?</h2>
            <p className="section-subtitle">A simple, smart, and digital approach to modern vehicle care.</p>
          </div>

          <div className="features-grid">
            {/* Card 1 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="feature-title">Easy Booking</h3>
              <p className="feature-desc">Book a mechanic without the hassle.</p>
            </div>

            {/* Card 2 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="feature-title">Transparent Process</h3>
              <p className="feature-desc">Keep the repair process clear and easy to understand.</p>
            </div>

            {/* Card 3 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="feature-title">Convenient Service</h3>
              <p className="feature-desc">Get vehicle repair assistance through a simple digital platform.</p>
            </div>

            {/* Card 4 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <h3 className="feature-title">Digital Experience</h3>
              <p className="feature-desc">Manage your mechanic booking and service information digitally.</p>
            </div>

            {/* Card 5 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="feature-title">Multiple Vehicle Services</h3>
              <p className="feature-desc">Access different repair and servicing requirements through one platform.</p>
            </div>

            {/* Card 6 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="feature-title">Reliable Mechanic Connection</h3>
              <p className="feature-desc">Find mechanics based on your vehicle's service needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How Mechze Works */}
      <section className="section section-alt" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Simple 3-Step Process</span>
            <h2 className="section-title">How Mechze Works</h2>
            <p className="section-subtitle">Get your vehicle serviced in three effortless steps.</p>
          </div>

          <div className="steps-grid">
            {/* Step 01 */}
            <div className="step-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Request a Service</h3>
              <p className="step-desc">Tell us about your vehicle problem or select the required service.</p>
            </div>

            {/* Step 02 */}
            <div className="step-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Connect With a Mechanic</h3>
              <p className="step-desc">Find a suitable mechanic for your requirement.</p>
            </div>

            {/* Step 03 */}
            <div className="step-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Get Your Vehicle Serviced</h3>
              <p className="step-desc">Get the repair or servicing completed and manage the process through Mechze.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Now Section (Rapido Compact Style) */}
      <section className="section section-alt" id="app-section">
        <div className="container">
          <div className="rapido-section-header">
            <h2 className="rapido-main-title">Download <span className="title-underline">Now</span></h2>
          </div>

          <div className="rapido-compact-grid">
            {/* Customer App Card */}
            <a href="#" className="rapido-compact-card" onClick={(e) => { e.preventDefault(); triggerModal('downloadCustomerModal'); }}>
              <div className="rapido-pill-badge-brand">
                <img src="/mechze-logo.jpg" alt="Mechze Logo" className="rapido-pill-logo-img" />
                <span className="rapido-pill-sub">User</span>
              </div>
              <div className="rapido-compact-text">
                <h3 className="rapido-compact-title">Vehicle Repairs,</h3>
                <p className="rapido-compact-sub">Servicing & Cabs</p>
              </div>
              <div className="rapido-compact-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            {/* Mechanic Partner App Card */}
            <a href="#" className="rapido-compact-card" onClick={(e) => { e.preventDefault(); triggerModal('downloadPartnerModal'); }}>
              <div className="rapido-pill-badge-brand partner-pill">
                <img src="/mechze-logo.jpg" alt="Mechze Partner Logo" className="rapido-pill-logo-img" />
                <span className="rapido-pill-sub">Partner</span>
              </div>
              <div className="rapido-compact-text">
                <h3 className="rapido-compact-title">Service &</h3>
                <p className="rapido-compact-sub">Earn</p>
              </div>
              <div className="rapido-compact-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* For Mechanics / Join Mechze Section */}
      <section className="section section-alt" id="mechanics">
        <div className="container">
          <div className="join-mechze-card">
            <div className="join-mechze-grid">
              {/* Content Side */}
              <div className="join-mechze-content">
                <span className="partner-tag">Partner With Mechze</span>
                <h2 className="join-mechze-title">Are You a Professional Mechanic or Garage Owner?</h2>
                <p className="join-mechze-desc">
                  Expand your reach and boost your income. Mechze connects skilled mechanics directly with vehicle owners
                  who need fast, reliable repairs and roadside servicing.
                </p>

                <div className="partner-benefits-list">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="benefit-text">
                      <strong>Consistent Job Flow</strong> — Receive real-time service requests nearby
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="benefit-text">
                      <strong>Transparent Earnings</strong> — Instant payouts with low platform fees
                    </div>
                  </div>

                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="benefit-text">
                      <strong>Flexible Schedule</strong> — Choose when and where you accept repair jobs
                    </div>
                  </div>
                </div>

                <div className="join-action-area">
                  <button className="btn btn-primary btn-lg join-mechze-btn" onClick={() => triggerModal('downloadPartnerModal')}>
                    Join Mechze Now
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                  <span className="join-subtext">Free registration • Instant verification</span>
                </div>
              </div>

              {/* Image Side */}
              <div className="join-mechze-visual">
                <div className="join-img-wrapper">
                  <img src="/garage-mechanic-partner.jpg" alt="Mechze Professional Mechanic Service Log" className="join-mechanic-img" />

                  {/* Floating Badge */}
                  <div className="floating-badge badge-bottom-left">
                    <div className="status-pulse-dot"></div>
                    <div className="badge-info">
                      <span className="badge-val">Instant Job Alerts</span>
                      <span className="badge-lbl">Active Network</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;