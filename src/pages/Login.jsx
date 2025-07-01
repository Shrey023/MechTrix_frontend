import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/auth/customer/login', {
        email,
        password
      });

      localStorage.setItem('customerId', res.data._id);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userType', res.data.userType);
        navigate('/dashboard');
      } else {
        setError('Login failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{
      backgroundColor: '#F7F8FA',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      fontFamily: "'Arial', sans-serif",
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{
          color: '#1E2A78',
          fontSize: '1.8rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>Customer Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              border: '1px solid #2D2D2D',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#2D2D2D',
              backgroundColor: '#F7F8FA',
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
            onBlur={(e) => e.target.style.borderColor = '#2D2D2D'}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              border: '1px solid #2D2D2D',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#2D2D2D',
              backgroundColor: '#F7F8FA',
              outline: 'none',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
            onBlur={(e) => e.target.style.borderColor = '#2D2D2D'}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#FF6B35',
              color: '#F7F8FA',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#FFD23F';
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#FF6B35';
              e.target.style.transform = 'scale(1)';
            }}
          >Login</button>
        </form>
        {error && <p style={{
          color: '#FF6B35',
          fontSize: '0.9rem',
          textAlign: 'center',
          marginTop: '1rem',
        }}>{error}</p>}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="maxWidth: 400px"] {
            padding: 1.5rem;
          }
          h2 {
            font-size: 1.5rem;
          }
          input {
            padding: 0.6rem;
            font-size: 0.9rem;
          }
          button {
            padding: 0.6rem;
            font-size: 1rem;
          }
        }
        @media (max-width: 480px) {
          div[style*="maxWidth: 400px"] {
            padding: 1rem;
          }
          h2 {
            font-size: 1.3rem;
          }
          input {
            padding: 0.5rem;
            font-size: 0.85rem;
          }
          button {
            padding: 0.5rem;
            font-size: 0.9rem;
          }
          p {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;