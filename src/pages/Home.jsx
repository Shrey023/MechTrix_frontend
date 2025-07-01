import React from 'react';

const Home = () => {
  return (
    <div style={{
      backgroundColor: '#F7F8FA',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'Arial', sans-serif",
    }}>
      <h1 style={{
        color: '#1E2A78',
        fontSize: '2.5rem',
        fontWeight: '700',
        marginBottom: '1rem',
        textAlign: 'center',
      }}>Welcome to MechTrix</h1>
      <p style={{
        color: '#2D2D2D',
        fontSize: '1.25rem',
        marginBottom: '2rem',
        textAlign: 'center',
        maxWidth: '600px',
      }}>Your on-the-go mechanic service!</p>
      <button style={{
        backgroundColor: '#FF6B35',
        color: '#F7F8FA',
        padding: '1rem 2rem',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#FFD23F'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#FF6B35'}
      >Book a Mechanic</button>

      <style jsx>{`
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }
          p {
            font-size: 1rem;
            padding: 0 1rem;
          }
          button {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
        }
        @media (max-width: 480px) {
          h1 {
            font-size: 1.5rem;
          }
          p {
            font-size: 0.9rem;
          }
          button {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;