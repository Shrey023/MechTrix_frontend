import React, { useState } from 'react';
import axios from 'axios';
import './DeleteAccount.css';

const DeleteAccount = () => {
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPolicy, setShowPolicy] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'https://mechtrix.onrender.com/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!identifier.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email or phone number' });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/account-deletion/request`, {
        identifier: identifier.trim()
      });

      setMessage({ 
        type: 'success', 
        text: response.data.message 
      });
      setIdentifier('');
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'An error occurred. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-account-page">
      <div className="delete-account-container">
        {/* Header */}
        <div className="delete-header">
          <img 
            src="/mechze-logo.png" 
            alt="Mechze Logo" 
            className="delete-logo"
            onError={(e) => e.target.style.display = 'none'}
          />
          <h1>Delete Your Mechze Account</h1>
          <p className="subtitle">We're sorry to see you go</p>
        </div>

        {/* Main Content */}
        <div className="delete-content">
          <div className="info-section">
            <h2>What happens when you delete your account?</h2>
            <div className="info-grid">
              <div className="info-card deleted">
                <h3>✗ Data Deleted</h3>
                <ul>
                  <li>Profile information</li>
                  <li>Name and contact details</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Saved addresses</li>
                  <li>Profile pictures</li>
                </ul>
              </div>
              <div className="info-card retained">
                <h3>✓ Data Retained (Legal Requirement)</h3>
                <ul>
                  <li>Anonymized booking history</li>
                  <li>Payment transaction records</li>
                  <li>Service invoices</li>
                </ul>
                <p className="retention-note">
                  <strong>Retention period:</strong> 90 days<br />
                  After 90 days, all data is permanently deleted.
                </p>
              </div>
            </div>
          </div>

          {/* Deletion Request Form */}
          <div className="form-section">
            <h2>Request Account Deletion</h2>
            <p className="form-description">
              Enter your registered email or phone number to initiate the deletion process.
            </p>

            <form onSubmit={handleSubmit} className="deletion-form">
              <div className="form-group">
                <label htmlFor="identifier">Email or Phone Number</label>
                <input
                  type="text"
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your email or phone"
                  disabled={loading}
                  className="form-input"
                />
              </div>

              {message.text && (
                <div className={`message ${message.type}`}>
                  {message.text}
                </div>
              )}

              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Request Account Deletion'}
              </button>
            </form>

            <div className="support-section">
              <p>
                Need help or have questions?<br />
                Contact us at <a href="mailto:support@mechze.com">mechzy01@gmail.com</a>
              </p>
            </div>
          </div>

          {/* Policy Toggle */}
          <div className="policy-section">
            <button 
              className="policy-toggle"
              onClick={() => setShowPolicy(!showPolicy)}
            >
              {showPolicy ? '▼' : '▶'} View Full Data Deletion Policy
            </button>
            
            {showPolicy && (
              <div className="policy-content">
                <h3>Data Deletion Policy</h3>
                <p>
                  When you request account deletion, Mechze will:
                </p>
                <ol>
                  <li>Immediately mark your account as "pending deletion"</li>
                  <li>Remove all personal identifiable information within 48 hours</li>
                  <li>Anonymize your booking and transaction history</li>
                  <li>Retain only anonymized data required by law (tax, audit purposes)</li>
                  <li>Permanently delete all remaining data after 90 days</li>
                </ol>
                <p>
                  This policy complies with Google Play Developer Program Policies 
                  and applicable data protection regulations including GDPR and CCPA.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
