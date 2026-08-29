import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('/auth/customer/login', {
        email,
        password
      });

      localStorage.setItem('customerId', res.data._id);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userType', res.data.userType || 'customer');
        navigate('/dashboard');
      } else {
        setError('Login failed. Please check credentials.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="section section-alt" style={{ paddingTop: 'calc(var(--nav-height) + 3rem)', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="modal-card" style={{ maxWidth: '440px', margin: '0 auto', boxShadow: 'var(--shadow-lg)' }}>
          <h2 className="modal-title" style={{ textAlign: 'center', fontSize: '1.75rem', marginBottom: '0.5rem' }}>Customer Login</h2>
          <p className="modal-subtitle" style={{ textAlign: 'center', marginBottom: '1.75rem' }}>Sign in to manage your bookings and profile.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div style={{ color: 'var(--error)', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/Userregister" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;