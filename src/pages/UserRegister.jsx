import React, { useState } from 'react';
import axios from '../api/axios';

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const { data } = await axios.post('/auth/customer/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      setSuccess('Registered successfully!');
      setError('');
      console.log('User Registered:', data);

      // Optionally clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      console.error(msg);
      setError(msg);
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
      <form onSubmit={handleSubmit} style={{
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
        }}>User Registration</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
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
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
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
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
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
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
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
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
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

        {error && <p style={{
          color: '#FF6B35',
          fontSize: '0.9rem',
          textAlign: 'center',
          marginBottom: '1rem',
        }}>{error}</p>}
        {success && <p style={{
          color: '#4CAF50',
          fontSize: '0.9rem',
          textAlign: 'center',
          marginBottom: '1rem',
        }}>{success}</p>}

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
        >Register</button>
      </form>

      <style jsx>{`
        @media (max-width: 768px) {
          form[style*="maxWidth: 400px"] {
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
          p {
            font-size: 0.85rem;
          }
        }
        @media (max-width: 480px) {
          form[style*="maxWidth: 400px"] {
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

export default UserRegister;