import React from 'react';
import { useNavigate } from 'react-router-dom';

const decodeEmailFromToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return '';
    const payload = JSON.parse(atob(parts[1]));
    return payload.email || payload.adminEmail || '';
  } catch (err) {
    return '';
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken') || '';
  const storedEmail = localStorage.getItem('adminEmail') || '';
  const decodedEmail = token ? decodeEmailFromToken(token) : '';
  const emailToShow = storedEmail || decodedEmail || 'Not available';

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
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
        maxWidth: '500px',
      }}>
        <h2 style={{
          color: '#1E2A78',
          fontSize: '1.8rem',
          fontWeight: '700',
          marginBottom: '1rem',
          textAlign: 'center',
        }}>
          Welcome Admin
        </h2>

        <p style={{
          color: '#2D2D2D',
          fontSize: '1rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          Email: {emailToShow}
        </p>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#FF6B35',
            color: '#F7F8FA',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
