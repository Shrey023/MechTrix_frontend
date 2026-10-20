import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import axios from '../api/axios';
import './AdminLogin.css';

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
        if (res.data.name) {
          localStorage.setItem('adminName', res.data.name);
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
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-badge">
          <ShieldCheck className="admin-login-badge-icon" />
        </div>
        
        <h2 className="admin-login-title">Admin Access</h2>
        <p className="admin-login-subtitle">Administrative Portal</p>
        
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-login-input-group">
            <label className="admin-login-label">Email Address</label>
            <input
              type="email"
              className="admin-login-input"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-login-input-group">
            <label className="admin-login-label">Password</label>
            <input
              type="password"
              className="admin-login-input"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-login-button">
            Login
          </button>
        </form>

        {error && (
          <div className="admin-login-error">
            {error}
          </div>
        )}

        <div className="admin-login-footer">
          Authorized personnel only
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
