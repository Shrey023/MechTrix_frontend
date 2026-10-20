import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User } from 'lucide-react';
import axios from '../api/axios';
import './Login.css';

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

      // Auth controller returns flat structure: { _id, name, email, userType, token }
      const customerId = res.data._id;
      
      if (!customerId) {
        setError('Login failed: Invalid response from server');
        return;
      }

      localStorage.setItem('customerId', customerId);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userType', 'customer');
        navigate('/dashboard');
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="customer-login-page">
      <div className="customer-login-container">
        <div className="customer-login-badge">
          <User className="customer-login-badge-icon" />
        </div>
        
        <h2 className="customer-login-title">Customer Login</h2>
        <p className="customer-login-subtitle">Access your account</p>
        
        <form className="customer-login-form" onSubmit={handleSubmit}>
          <div className="customer-login-input-group">
            <label className="customer-login-label">Email Address</label>
            <input
              type="email"
              className="customer-login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="customer-login-input-group">
            <label className="customer-login-label">Password</label>
            <input
              type="password"
              className="customer-login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="customer-login-button">
            Login
          </button>
        </form>

        {error && (
          <div className="customer-login-error">
            {error}
          </div>
        )}

        <div className="customer-login-footer">
          <p className="customer-login-footer-text">
            Don't have an account?{' '}
            <Link to="/register" className="customer-login-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;