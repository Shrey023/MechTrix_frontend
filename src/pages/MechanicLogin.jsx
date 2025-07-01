import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './MechanicLogin.css';

const MechanicLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/mechanic/login', { email, password });

      localStorage.setItem('mechanicToken', res.data.token);
      localStorage.setItem('mechanicId', res.data._id);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userType', res.data.userType);

      navigate('/mechanic/dashboard'); // ✅ dashboard, not profile
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="mechanic-login">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Mechanic Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default MechanicLogin;