import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      background:
        'radial-gradient(80rem 40rem at -20% -10%, rgba(166, 75, 10, 0.05), transparent 60%),\
         radial-gradient(70rem 35rem at 120% 110%, rgba(166, 75, 10, 0.04), transparent 60%),\
         linear-gradient(180deg, #FAFAF9 0%, #F3F4F6 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5rem 1rem',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      color: '#111827'
    }}>
      <h1 style={{
        color: '#111827',
        fontSize: '2.6rem',
        fontWeight: 800,
        marginBottom: '0.75rem',
        textAlign: 'center'
      }}>Welcome to MECHZE</h1>
      <p style={{
        color: '#374151',
        fontSize: '1.1rem',
        marginBottom: '1.5rem',
        textAlign: 'center',
        maxWidth: 640
      }}>Your on-the-go mechanic service!</p>
      <Link to="/nearby" style={{ textDecoration: 'none' }}>
        <button style={{
          backgroundColor: '#A64B0A',
          color: '#FFFFFF',
          padding: '0.9rem 1.5rem',
          border: 'none',
          borderRadius: '10px',
          fontSize: '1.05rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background-color 150ms ease, transform 150ms ease, box-shadow 200ms ease',
          boxShadow: '0 10px 24px rgba(166, 75, 10, 0.18)'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#8F4108';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#A64B0A';
          e.target.style.transform = 'translateY(0)';
        }}
        >Book a Mechanic</button>
      </Link>

      {/* Services Section */}
      <section style={{
        marginTop: '3rem',
        marginBottom: '2rem',
        width: '100%',
        maxWidth: '1000px'
      }}>
        <h2 style={{
          color: '#111827',
          fontSize: '1.8rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>Our Services</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          padding: '0 1rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '1.25rem',
            width: '250px',
            textAlign: 'center',
            border: '1px solid #E5E7EB',
            boxShadow: '0 10px 24px rgba(17, 24, 39, 0.08)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 14px 28px rgba(17, 24, 39, 0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 24px rgba(17, 24, 39, 0.08)';
          }}>
            <img 
              src="/images/breakdown.png" 
              alt="Breakdown Repair" 
              style={{
                width: '100%',
                height: '120px',
                objectFit: 'contain',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
            />
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#111827'
            }}>Breakdown Repair</h3>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '1.25rem',
            width: '250px',
            textAlign: 'center',
            border: '1px solid #E5E7EB',
            boxShadow: '0 10px 24px rgba(17, 24, 39, 0.08)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 14px 28px rgba(17, 24, 39, 0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 24px rgba(17, 24, 39, 0.08)';
          }}>
            <img 
              src="/images/schedule.png" 
              alt="Scheduled Service" 
              style={{
                width: '100%',
                height: '120px',
                objectFit: 'contain',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
            />
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#111827'
            }}>Scheduled Service</h3>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '1.25rem',
            width: '250px',
            textAlign: 'center',
            border: '1px solid #E5E7EB',
            boxShadow: '0 10px 24px rgba(17, 24, 39, 0.08)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 14px 28px rgba(17, 24, 39, 0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 24px rgba(17, 24, 39, 0.08)';
          }}>
            <img 
              src="/images/emergency.png" 
              alt="Emergency Pickup" 
              style={{
                width: '100%',
                height: '120px',
                objectFit: 'contain',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
            />
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#111827'
            }}>Emergency Pickup</h3>
          </div>
        </div>
      </section>

      {/* Auth Buttons */}
      <div style={{
        display: 'flex',
        gap: '0.85rem',
        marginTop: '1.25rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={{
            backgroundColor: '#FFFFFF',
            color: 'rgb(166, 75, 10)',
            padding: '0.8rem 1.25rem',
            border: '1px solid rgb(166, 75, 10)',
            borderRadius: '9999px',
            fontSize: '0.98rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
            cursor: 'pointer',
            transition: 'background-color 150ms ease, transform 150ms ease, box-shadow 200ms ease, opacity 150ms ease',
            boxShadow: '0 10px 24px rgba(166, 75, 10, 0.14)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(166, 75, 10, 0.08)';
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.opacity = '1';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#FFFFFF';
            e.target.style.transform = 'translateY(0)';
            e.target.style.opacity = '1';
          }}
          >Log In</button>
        </Link>

        <Link to="/Userregister" style={{ textDecoration: 'none' }}>
          <button style={{
            backgroundColor: 'rgb(166, 75, 10)',
            color: '#FFFFFF',
            padding: '0.8rem 1.25rem',
            border: '1px solid rgb(166, 75, 10)',
            borderRadius: '9999px',
            fontSize: '0.98rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
            cursor: 'pointer',
            transition: 'background-color 150ms ease, transform 150ms ease, box-shadow 200ms ease',
            boxShadow: '0 10px 24px rgba(166, 75, 10, 0.22)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgb(143, 65, 8)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgb(166, 75, 10)';
            e.target.style.transform = 'translateY(0)';
          }}
          >Create Account</button>
        </Link>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        paddingTop: '3rem',
        textAlign: 'center',
        fontSize: '0.875rem',
        color: '#6B7280'
      }}>
        <p style={{ margin: '0 0 0.5rem 0' }}>
          © 2025 Mechze. All rights reserved.
        </p>
        <Link to="/privacy-policy" style={{
          color: '#A64B0A',
          textDecoration: 'none',
          fontWeight: 500
        }}
        onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
        onMouseOut={(e) => e.target.style.textDecoration = 'none'}
        >
          Privacy Policy
        </Link>
      </footer>

      <style jsx>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 2.1rem;
          }
          p {
            font-size: 1rem;
            padding: 0 1rem;
          }
          button {
            padding: 0.75rem 1.4rem;
            font-size: 1rem;
          }
        }
        @media (max-width: 480px) {
          h1 {
            font-size: 1.7rem;
          }
          p {
            font-size: 0.9rem;
          }
          button {
            padding: 0.55rem 1rem;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;