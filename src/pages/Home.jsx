import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      background: 'var(--color-bg, #0E0C0A)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      color: 'var(--color-off-white, #F6F6F7)',
      fontFamily: "'Barlow', sans-serif",
      paddingTop: '64px',
    }}>
      {/* ── HERO ── */}
      <section style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 10vw, 6rem) clamp(1rem, 5vw, 2rem)',
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
          }}>On-Demand Mechanic Service</span>
          <span style={{ width: '32px', height: '1px', background: 'var(--color-brown)' }} />
        </div>

        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          color: 'var(--color-off-white)',
          lineHeight: 1,
          marginBottom: '1.25rem',
          maxWidth: '800px',
        }}>
          Welcome to{' '}
          <span style={{ color: 'var(--color-brown-light, #A0561E)' }}>MECHZE</span>
        </h1>

        <p style={{
          fontFamily: "'Barlow', sans-serif",
          color: 'var(--color-warm-gray, #ABA19C)',
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          marginBottom: '2.5rem',
          maxWidth: '560px',
          lineHeight: 1.75,
          fontWeight: 300,
        }}>
          Your on-the-go mechanic serice. Fast, reliable, and always nearby — book a trusted mechanic in minutes.
        </p>

        {/* Primary CTA */}
        <Link to="/nearby" style={{ textDecoration: 'none' }}>
          <button style={{
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
            cursor: 'none',
            transition: 'background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'var(--color-brown-light, #A0561E)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(131,68,23,0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'var(--color-brown, #834417)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            Book a Mechanic
          </button>
        </Link>

        {/* Auth Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
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
              cursor: 'none',
              transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'rgba(131,68,23,0.9)';
              e.currentTarget.style.color = 'var(--color-off-white)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(131,68,23,0.45)';
              e.currentTarget.style.color = 'var(--color-warm-gray)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              Log In
            </button>
          </Link>

          <Link to="/Userregister" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'var(--color-brown)',
              color: 'var(--color-off-white)',
              border: 'none',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              padding: '12px 32px',
              cursor: 'none',
              transition: 'background 0.2s ease, transform 0.15s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--color-brown-light)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--color-brown)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              Create Account
            </button>
          </Link>
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section style={{
        background: 'var(--color-bg2, #141210)',
        borderTop: '1px solid rgba(131,68,23,0.2)',
        padding: 'clamp(2rem, 6vw, 3rem) clamp(1rem, 5vw, 3rem)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            { icon: '📍', title: 'Nearby', desc: 'Find mechanics within your area instantly' },
            { icon: '📡', title: 'Live Track', desc: 'Track your mechanic in real time' },
            { icon: '🔧', title: 'Expert Fix', desc: 'All vehicle types and services covered' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{
              background: 'var(--color-bg3, #1C1916)',
              border: '1px solid rgba(131,68,23,0.12)',
              borderRadius: '2px',
              padding: '1.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--color-bg4)';
              e.currentTarget.style.borderColor = 'rgba(131,68,23,0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--color-bg3)';
              e.currentTarget.style.borderColor = 'rgba(131,68,23,0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{icon}</div>
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'var(--color-off-white)',
                marginBottom: '0.4rem',
              }}>{title}</h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--color-warm-gray)',
                lineHeight: 1.6,
              }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;