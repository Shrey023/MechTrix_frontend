import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSettings.css';

const AdminSettings = () => {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem('adminEmail') || 'Not available';
  const adminName = localStorage.getItem('adminName') || 'Administrator';
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [notifications, setNotifications] = useState({
    email: true,
    bookings: true,
    registrations: false,
  });
  const [preferences, setPreferences] = useState({
    density: 'comfortable',
    dateFormat: 'local',
  });

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
    navigate('/admin/login');
  };

  const toggleNotification = (name) => {
    setNotifications((current) => ({ ...current, [name]: !current[name] }));
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    setProfileMessage('Profile saving is not connected yet.');
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    setPasswordMessage('Password changes are not connected yet.');
  };

  return (
    <div className="admin-settings-page">
      <header className="settings-header">
        <div>
          <p className="settings-eyebrow">ADMIN CONTROL CENTER</p>
          <h1 className="settings-title">SETTINGS</h1>
          <p className="settings-intro">Manage your dashboard workspace and account preferences.</p>
        </div>
      </header>

      <div className="settings-grid">
        <section className="settings-panel settings-profile-panel">
          <div className="settings-panel-heading">
            <div>
              <p className="settings-panel-kicker">Identity</p>
              <h2>Admin Profile</h2>
            </div>
            <button type="button" className="settings-secondary-btn" onClick={() => { setIsEditingProfile((current) => !current); setProfileMessage(''); }}>
              {isEditingProfile ? 'Close' : 'Edit Profile'}
            </button>
          </div>

          <div className="settings-profile-summary">
            <div className="settings-avatar">{adminName.charAt(0).toUpperCase()}</div>
            <div>
              <strong>{adminName}</strong>
              <span>{adminEmail}</span>
            </div>
          </div>

          {isEditingProfile && (
            <form className="settings-form" onSubmit={handleProfileSubmit}>
              <label>
                <span>Admin Name</span>
                <input type="text" value={adminName} readOnly />
              </label>
              <label>
                <span>Email</span>
                <input type="email" value={adminEmail} readOnly />
              </label>
              <div className="settings-form-actions">
                <button type="submit" className="settings-primary-btn">Save Profile</button>
                <span className="settings-form-note">{profileMessage || 'Profile editing will be available when an API is added.'}</span>
              </div>
            </form>
          )}
        </section>

        <section className="settings-panel">
          <div className="settings-panel-heading">
            <div>
              <p className="settings-panel-kicker">Security</p>
              <h2>Account</h2>
            </div>
          </div>
          <p className="settings-panel-description">Keep account security controls together for quick access.</p>
          <button type="button" className="settings-secondary-btn settings-wide-btn" onClick={() => { setIsChangingPassword((current) => !current); setPasswordMessage(''); }}>
            {isChangingPassword ? 'Close Password Form' : 'Change Password'}
          </button>
          {isChangingPassword && (
            <form className="settings-form" onSubmit={handlePasswordSubmit}>
              <label><span>Current Password</span><input type="password" placeholder="Enter current password" /></label>
              <label><span>New Password</span><input type="password" placeholder="Enter new password" /></label>
              <label><span>Confirm Password</span><input type="password" placeholder="Confirm new password" /></label>
              <div className="settings-form-actions">
                <button type="submit" className="settings-primary-btn">Update Password</button>
                <span className="settings-form-note">{passwordMessage || 'Password updates are UI-only for now.'}</span>
              </div>
            </form>
          )}
          <button type="button" className="settings-danger-btn settings-wide-btn" onClick={handleLogout}>Log Out</button>
        </section>

        <section className="settings-panel">
          <div className="settings-panel-heading">
            <div>
              <p className="settings-panel-kicker">Workspace Signals</p>
              <h2>Notifications</h2>
            </div>
          </div>
          <div className="settings-toggle-list">
            <label className="settings-toggle-row">
              <span><strong>Email notifications</strong><small>Receive important admin updates by email.</small></span>
              <input type="checkbox" checked={notifications.email} onChange={() => toggleNotification('email')} />
            </label>
            <label className="settings-toggle-row">
              <span><strong>Booking notifications</strong><small>Show booking activity in your workspace.</small></span>
              <input type="checkbox" checked={notifications.bookings} onChange={() => toggleNotification('bookings')} />
            </label>
            <label className="settings-toggle-row">
              <span><strong>New customer registrations</strong><small>Alert when a customer joins the platform.</small></span>
              <input type="checkbox" checked={notifications.registrations} onChange={() => toggleNotification('registrations')} />
            </label>
          </div>
          <p className="settings-ui-note">Notification preferences are saved for this session only.</p>
        </section>

        <section className="settings-panel">
          <div className="settings-panel-heading">
            <div>
              <p className="settings-panel-kicker">Workspace Display</p>
              <h2>Dashboard Preferences</h2>
            </div>
          </div>
          <div className="settings-form">
            <label>
              <span>Table density</span>
              <select value={preferences.density} onChange={(event) => setPreferences((current) => ({ ...current, density: event.target.value }))}>
                <option value="comfortable">Comfortable</option>
                <option value="compact">Compact</option>
              </select>
            </label>
            <label>
              <span>Date display</span>
              <select value={preferences.dateFormat} onChange={(event) => setPreferences((current) => ({ ...current, dateFormat: event.target.value }))}>
                <option value="local">Local format</option>
                <option value="relative">Relative time</option>
              </select>
            </label>
          </div>
          <p className="settings-ui-note">Preferences are UI-only until persistence is available.</p>
        </section>

        <section className="settings-panel settings-system-panel">
          <div className="settings-panel-heading">
            <div>
              <p className="settings-panel-kicker">Environment</p>
              <h2>System Information</h2>
            </div>
          </div>
          <dl className="settings-system-list">
            <div><dt>Application</dt><dd>MechTrix</dd></div>
            <div><dt>Admin Dashboard</dt><dd>v1.0</dd></div>
            <div><dt>Backend / API</dt><dd><span className="settings-status-dot" />Not checked</dd></div>
          </dl>
          <p className="settings-ui-note">API status is informational until a health endpoint is available.</p>
        </section>
      </div>
    </div>
  );
};

export default AdminSettings;
