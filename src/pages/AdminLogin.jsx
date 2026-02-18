import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/admin/login', { email, password });
      if (res.data?.token) {
        localStorage.setItem('adminToken', res.data.token);
        if (res.data.email) {
          localStorage.setItem('adminEmail', res.data.email);
        }
        navigate('/admin/dashboard');
      } else {
        setError('Login failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
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
        }}>Admin Login</h2>

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
            }}
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
            }}
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
            }}
          >
            Login
          </button>
        </form>

        {error && (
          <p style={{ color: '#FF6B35', fontSize: '0.9rem', textAlign: 'center', marginTop: '1rem' }}>
            {error}
          </p>
        )}

        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#2D2D2D' }}>
          No admin account? <Link to="/admin/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
