/**
 * Home.jsx - Complete Landing Page
 * Updated: ESC key support, reduced image sizes, no duplicate footer (universal footer used)
 * Using shared Navbar component only - Footer is rendered by App.jsx layout
 * Images used: app-mockup.png (300px max), customer-qr.png, mechanic-qr.png
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

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
      <div style={{
        background: 'var(--color-bg, #0E0C0A)',
        minHeight: '100vh',
        color: 'var(--color-off-white, #F6F6F7)',
        fontFamily: "'Barlow', sans-serif",
      }}>
      
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1rem, 5vw, 2rem) clamp(4rem, 8vw, 6rem)',
        textAlign: 'center',
        position: 'relative',
        background: `
          radial-gradient(ellipse 80rem 40rem at 50% -10%, rgba(131,68,23,0.12), transparent 60%),
          var(--color-bg, #0E0C0A)
        `,
        borderBottom: '1px solid rgba(131, 68, 23, 0.15)',
      }}>
        
        {/* Kicker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', justifyContent: 'center' }}>
          <span style={{ width: '32px', height: '1px', background: 'var(--color-brown)' }} />
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '12px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--color-brown-light, #A0561E)',
          }}>Simplified Auto Repair Platform</span>
          <span style={{ width: '32px', height: '1px', background: 'var(--color-brown)' }} />
        </div>

        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          color: 'var(--color-off-white)',
          lineHeight: 1.1,
          marginBottom: '1rem',
          maxWidth: '900px',
        }}>
          Your Trusted Mechanic,<br/>Just a Few Taps Away.
        </h1>

        <p style={{
          fontFamily: "'Barlow', sans-serif",
          color: 'var(--color-warm-gray, #ABA19C)',
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          marginBottom: '2.5rem',
          maxWidth: '600px',
          lineHeight: 1.75,
          fontWeight: 400,
        }}>
          Mechze makes vehicle repair and servicing simple, convenient, and transparent.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <button 
            onClick={() => setShowBookingModal(true)}
            style={{
              background: 'var(--color-brown, #834417)',
              color: 'var(--color-off-white)',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: '15px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              padding: '14px 40px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
            Book a Mechanic
          </button>

          <Link to="/nearby" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'transparent',
              color: 'var(--color-warm-gray)',
              border: '1px solid rgba(131,68,23,0.45)',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              padding: '12px 32px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>
              Find Mechanic
            </button>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ABOUT MECHZE SECTION
          ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--color-bg2, #141210)',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2rem)',
        borderTop: '1px solid rgba(131,68,23,0.2)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ width: '32px', height: '1px', background: 'var(--color-brown)' }} />
              <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'var(--color-brown-light)',
              }}>About Mechze</span>
            </div>

            <h2 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              marginBottom: '1.5rem',
            }}>
              Making Vehicle Repair Simple
            </h2>

            <p style={{
              color: 'var(--color-warm-gray)',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              marginBottom: '2rem',
            }}>
              Mechze is built to make finding and booking a mechanic easier. We connect vehicle owners with mechanics
              through a simple digital platform, making the repair and servicing experience more convenient.
            </p>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '1.5rem' }}>✓</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: '1.1rem' }}>Simple Navigation</span>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '1.5rem' }}>✓</span>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: '1.1rem' }}>Clear Process</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <img src={appMockup} alt="Mechze App" style={{ width: '100%', maxWidth: '300px', height: 'auto', borderRadius: '8px' }} />
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHY CHOOSE MECHZE
          ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--color-bg, #0E0C0A)',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2rem)',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', justifyContent: 'center' }}>
          <span style={{ width: '32px', height: '1px', background: 'var(--color-brown)' }} />
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--color-brown-light)',
          }}>Key Advantages</span>
          <span style={{ width: '32px', height: '1px', background: 'var(--color-brown)' }} />
        </div>

        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '0.75rem',
        }}>
          Why Choose Mechze?
        </h2>

        <p style={{
          color: 'var(--color-warm-gray)',
          fontSize: '1.05rem',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem',
        }}>
          A simple, smart, and digital approach to modern vehicle care.
        </p>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {[
            { icon: '📱', title: 'Easy Booking', desc: 'Book a mechanic without the hassle.' },
            { icon: '🔍', title: 'Transparent Process', desc: 'Keep the repair process clear and easy to understand.' },
            { icon: '⚙️', title: 'Convenient Service', desc: 'Get vehicle repair assistance through a simple digital platform.' },
            { icon: '💻', title: 'Digital Experience', desc: 'Manage your mechanic booking and service information digitally.' },
            { icon: '🚗', title: 'Multiple Vehicle Services', desc: 'Access different repair and servicing requirements through one platform.' },
            { icon: '🔧', title: 'Reliable Mechanic Connection', desc: 'Find mechanics based on your vehicle\'s service needs.' },
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'var(--color-bg3, #1C1916)',
              border: '1px solid rgba(131,68,23,0.12)',
              borderRadius: '4px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '0.75rem',
              }}>{item.title}</h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--color-warm-gray)',
                lineHeight: 1.6,
              }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          HOW MECHZE WORKS
          ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--color-bg2, #141210)',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2rem)',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', justifyContent: 'center' }}>
          <span style={{ width: '32px', height: '1px', background: 'var(--color-brown)' }} />
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--color-brown-light)',
          }}>Simple 3-Step Process</span>
          <span style={{ width: '32px', height: '1px', background: 'var(--color-brown)' }} />
        </div>

        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '0.75rem',
        }}>
          How Mechze Works
        </h2>

        <p style={{
          color: 'var(--color-warm-gray)',
          fontSize: '1.05rem',
          marginBottom: '3rem',
        }}>
          Get your vehicle serviced in three effortless steps.
        </p>

        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
        }}>
          {[
            { num: '01', title: 'Request a Service', desc: 'Tell us about your vehicle problem or select the required service.' },
            { num: '02', title: 'Connect With a Mechanic', desc: 'Find a suitable mechanic for your requirement.' },
            { num: '03', title: 'Get Your Vehicle Serviced', desc: 'Get the repair or servicing completed and manage the process through Mechze.' },
          ].map((step, idx) => (
            <div key={idx} style={{
              background: 'var(--color-bg3)',
              border: '1px solid rgba(131,68,23,0.15)',
              borderRadius: '4px',
              padding: '2rem 1.5rem',
            }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '3rem',
                fontWeight: 700,
                color: 'var(--color-brown-light)',
                marginBottom: '1rem',
              }}>{step.num}</div>
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '1.3rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '0.75rem',
              }}>{step.title}</h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--color-warm-gray)',
                lineHeight: 1.6,
              }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          DOWNLOAD NOW SECTION (REDUCED SIZE)
          ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--color-bg, #0E0C0A)',
        padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1rem, 5vw, 2rem)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '2rem',
        }}>
          Download Now
        </h2>

        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          
          {/* Customer App */}
          <div onClick={() => setShowCustomerModal(true)} style={{
            background: 'var(--color-bg3)',
            border: '1px solid rgba(131,68,23,0.15)',
            borderRadius: '8px',
            padding: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            flex: '1 1 280px',
            maxWidth: '320px',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📱</div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--color-brown-light)',
              marginBottom: '0.5rem',
            }}>User</div>
            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.2rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}>Customer App</h3>
            <button style={{
              background: 'var(--color-brown)',
              color: 'var(--color-off-white)',
              border: 'none',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              padding: '8px 20px',
              cursor: 'pointer',
            }}>Download</button>
          </div>

          {/* Mechanic App */}
          <div onClick={() => setShowPartnerModal(true)} style={{
            background: 'var(--color-bg3)',
            border: '1px solid rgba(131,68,23,0.15)',
            borderRadius: '8px',
            padding: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            flex: '1 1 280px',
            maxWidth: '320px',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔧</div>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--color-brown-light)',
              marginBottom: '0.5rem',
            }}>Partner</div>
            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.2rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}>Mechanic App</h3>
            <button style={{
              background: 'var(--color-brown)',
              color: 'var(--color-off-white)',
              border: 'none',
              clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              padding: '8px 20px',
              cursor: 'pointer',
            }}>Download</button>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PARTNER WITH MECHZE (WITHOUT IMAGE)
          ═══════════════════════════════════════════════════════ */}
      <section style={{
        background: 'var(--color-bg2, #141210)',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2rem)',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '1rem',
          }}>
            Partner With Mechze
          </h2>

          <h3 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '1.3rem',
            fontWeight: 600,
            color: 'var(--color-brown-light)',
            marginBottom: '1.5rem',
          }}>
            Are You a Professional Mechanic or Garage Owner?
          </h3>

          <p style={{
            color: 'var(--color-warm-gray)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            marginBottom: '2rem',
          }}>
            Expand your reach and boost your income. Mechze connects skilled mechanics directly with vehicle owners
            who need fast, reliable repairs and roadside servicing.
          </p>

          <div style={{ marginBottom: '2rem', display: 'inline-block', textAlign: 'left' }}>
            {[
              { icon: '✓', text: 'Consistent Job Flow — Receive real-time service requests nearby' },
              { icon: '✓', text: 'Transparent Earnings — Instant payouts with low platform fees' },
              { icon: '✓', text: 'Flexible Schedule — Choose when and where you accept repair jobs' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--color-brown-light)', fontSize: '1.5rem', lineHeight: 1 }}>{item.icon}</span>
                <p style={{ color: 'var(--color-warm-gray)', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setShowJoinModal(true)}
            style={{
              background: 'var(--color-brown)',
              color: 'var(--color-off-white)',
              border: 'none',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: '15px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              padding: '14px 40px',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}>
            Join Mechze Now →
          </button>

          <p style={{ fontSize: '0.9rem', color: 'var(--color-warm-gray)' }}>
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
        <div onClick={() => setShowBookingModal(false)} style={{
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
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}>
            <button onClick={() => setShowBookingModal(false)} style={{
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
            }}>Book a Mechanic</h3>
            <p style={{ color: 'var(--color-warm-gray)', marginBottom: '1.5rem' }}>Tell us your vehicle details to get started.</p>

            <form onSubmit={handleBookingSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.95rem' }}>Vehicle Type</label>
                <select 
                  value={bookingForm.vehicleType}
                  onChange={(e) => setBookingForm({...bookingForm, vehicleType: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--color-bg3)',
                    border: '1px solid rgba(131,68,23,0.3)',
                    borderRadius: '4px',
                    color: 'var(--color-off-white)',
                    fontFamily: "'Barlow', sans-serif",
                  }}>
                  <option value="">Select vehicle type</option>
                  <option value="car">Car / Four Wheeler</option>
                  <option value="two-wheeler">Two Wheeler / Motorcycle</option>
                  <option value="commercial">Commercial Vehicle</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.95rem' }}>Required Service / Issue</label>
                <input 
                  type="text"
                  value={bookingForm.service}
                  onChange={(e) => setBookingForm({...bookingForm, service: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--color-bg3)',
                    border: '1px solid rgba(131,68,23,0.3)',
                    borderRadius: '4px',
                    color: 'var(--color-off-white)',
                    fontFamily: "'Barlow', sans-serif",
                  }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.95rem' }}>Location / City</label>
                <input 
                  type="text"
                  value={bookingForm.location}
                  onChange={(e) => setBookingForm({...bookingForm, location: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--color-bg3)',
                    border: '1px solid rgba(131,68,23,0.3)',
                    borderRadius: '4px',
                    color: 'var(--color-off-white)',
                    fontFamily: "'Barlow', sans-serif",
                  }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.95rem' }}>Phone Number</label>
                <input 
                  type="tel"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--color-bg3)',
                    border: '1px solid rgba(131,68,23,0.3)',
                    borderRadius: '4px',
                    color: 'var(--color-off-white)',
                    fontFamily: "'Barlow', sans-serif",
                  }} />
              </div>

              <button type="submit" style={{
                width: '100%',
                background: 'var(--color-brown)',
                color: 'var(--color-off-white)',
                border: 'none',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                padding: '14px',
                cursor: 'pointer',
              }}>Submit Booking Request</button>

              {bookingSubmitted && (
                <p style={{ marginTop: '1rem', color: '#6DBF7E', textAlign: 'center' }}>
                  ✓ Booking request submitted! Downloading Mechze app gives live status updates.
                </p>
              )}
            </form>

            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-warm-gray)' }}>
              Press <kbd style={{ background: 'var(--color-bg3)', padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace' }}>ESC</kbd> to close
            </p>
          </div>
        </div>
      )}

      {/* Customer App Modal */}
      {showCustomerModal && (
        <div onClick={() => setShowCustomerModal(false)} style={{
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
            maxWidth: '450px',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
          }}>
            <button onClick={() => setShowCustomerModal(false)} style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: 'var(--color-warm-gray)',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}>✕</button>

            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--color-brown-light)',
              marginBottom: '0.5rem',
            }}>For Vehicle Owners</div>

            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}>Download Mechze Customer App</h3>

            <p style={{ color: 'var(--color-warm-gray)', marginBottom: '2rem' }}>
              Book vehicle repair, inspection, and servicing in a few taps.
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <img src={customerQR} alt="Customer App QR" style={{ width: '150px', height: '150px', border: '2px solid rgba(131,68,23,0.2)', borderRadius: '8px' }} />
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-warm-gray)' }}>Scan QR to download Customer App</p>
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
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontFamily: "'Barlow', sans-serif",
              }}>
              <span style={{ fontSize: '1.5rem' }}>▶</span>
              <div>
                <div style={{ fontSize: '0.75rem' }}>GET IT ON</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Google Play</div>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Partner App Modal */}
      {showPartnerModal && (
        <div onClick={() => setShowPartnerModal(false)} style={{
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
            maxWidth: '450px',
            width: '100%',
            textAlign: 'center',
            position: 'relative',
          }}>
            <button onClick={() => setShowPartnerModal(false)} style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: 'var(--color-warm-gray)',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}>✕</button>

            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--color-brown-light)',
              marginBottom: '0.5rem',
            }}>For Mechanics</div>

            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '1.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}>Download Mechze Partner App</h3>

            <p style={{ color: 'var(--color-warm-gray)', marginBottom: '2rem' }}>
              Accept service requests, track customer locations, and manage repair jobs.
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <img src={mechanicQR} alt="Mechanic App QR" style={{ width: '150px', height: '150px', border: '2px solid rgba(131,68,23,0.2)', borderRadius: '8px' }} />
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-warm-gray)' }}>Scan QR to download Mechanic App</p>
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
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontFamily: "'Barlow', sans-serif",
              }}>
              <span style={{ fontSize: '1.5rem' }}>▶</span>
              <div>
                <div style={{ fontSize: '0.75rem' }}>GET IT ON</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Google Play</div>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Join Mechanic Modal */}
      {showJoinModal && (
        <div onClick={() => setShowJoinModal(false)} style={{
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
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}>
            <button onClick={() => setShowJoinModal(false)} style={{
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
            }}>Join Mechze as a Mechanic</h3>
            <p style={{ color: 'var(--color-warm-gray)', marginBottom: '1.5rem' }}>Connect with vehicle owners seeking repair & servicing.</p>

            <form onSubmit={handleJoinSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.95rem' }}>Full Name / Garage Name</label>
                <input 
                  type="text"
                  value={joinForm.name}
                  onChange={(e) => setJoinForm({...joinForm, name: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--color-bg3)',
                    border: '1px solid rgba(131,68,23,0.3)',
                    borderRadius: '4px',
                    color: 'var(--color-off-white)',
                    fontFamily: "'Barlow', sans-serif",
                  }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.95rem' }}>Mobile Number</label>
                <input 
                  type="tel"
                  value={joinForm.mobile}
                  onChange={(e) => setJoinForm({...joinForm, mobile: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--color-bg3)',
                    border: '1px solid rgba(131,68,23,0.3)',
                    borderRadius: '4px',
                    color: 'var(--color-off-white)',
                    fontFamily: "'Barlow', sans-serif",
                  }} />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.95rem' }}>Specialization / Expertise</label>
                <select 
                  value={joinForm.specialization}
                  onChange={(e) => setJoinForm({...joinForm, specialization: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--color-bg3)',
                    border: '1px solid rgba(131,68,23,0.3)',
                    borderRadius: '4px',
                    color: 'var(--color-off-white)',
                    fontFamily: "'Barlow', sans-serif",
                  }}>
                  <option value="">Select primary service area</option>
                  <option value="car-repair">Car Mechanical Repair</option>
                  <option value="two-wheeler">Two-Wheeler Repair</option>
                  <option value="electrical">Auto Electricals & Battery</option>
                  <option value="servicing">General Servicing & Maintenance</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '0.95rem' }}>Service City / Area</label>
                <input 
                  type="text"
                  value={joinForm.city}
                  onChange={(e) => setJoinForm({...joinForm, city: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'var(--color-bg3)',
                    border: '1px solid rgba(131,68,23,0.3)',
                    borderRadius: '4px',
                    color: 'var(--color-off-white)',
                    fontFamily: "'Barlow', sans-serif",
                  }} />
              </div>

              <button type="submit" style={{
                width: '100%',
                background: 'var(--color-brown)',
                color: 'var(--color-off-white)',
                border: 'none',
                clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                padding: '14px',
                cursor: 'pointer',
              }}>Submit Application</button>

              {joinSubmitted && (
                <p style={{ marginTop: '1rem', color: '#6DBF7E', textAlign: 'center' }}>
                  ✓ Application submitted! Our team will get in touch with you shortly.
                </p>
              )}
            </form>

            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--color-warm-gray)' }}>
              Press <kbd style={{ background: 'var(--color-bg3)', padding: '2px 8px', borderRadius: '3px', fontFamily: 'monospace' }}>ESC</kbd> to close
            </p>
          </div>
        </div>
      )}

    </>
  );
};

export default Home;
