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