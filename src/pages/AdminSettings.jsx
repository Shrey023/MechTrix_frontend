import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './AdminSettings.css';

const AdminSettings = () => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState(localStorage.getItem('adminEmail') || '');
  const [adminName, setAdminName] = useState(localStorage.getItem('adminName') || '');
  const [adminPhone, setAdminPhone] = useState('');
  
  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({ name: '', email: '', phone: '' });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');
  
  // Password change state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Notification settings state
  const [notifications, setNotifications] = useState({ email: true, bookings: true, registrations: false });
  const [preferences, setPreferences] = useState({
    density: 'comfortable',
    dateFormat: 'local',
  });
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [savingSetting, setSavingSetting] = useState('');
  const [settingsMessage, setSettingsMessage] = useState('');
  const [settingsError, setSettingsError] = useState('');

  const authConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await axios.get('/admin/settings', authConfig());
        setNotifications(response.data.settings.notifications);
        setPreferences(response.data.settings.preferences);
      } catch (err) {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminEmail');
          localStorage.removeItem('adminName');
          navigate('/admin/login');
        } else {
          setSettingsError(err.response?.data?.message || 'Failed to load settings');
        }
      } finally {
        setSettingsLoading(false);
      }
    };
    loadSettings();
    
    // Initialize profile form with current data
    setProfileData({
      name: adminName || '',
      email: adminEmail || '',
      phone: adminPhone || ''
    });
  }, [navigate, adminName, adminEmail, adminPhone]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
    navigate('/admin/login');
  };

  const toggleNotification = async (name) => {
    if (savingSetting || settingsLoading) return;
    const nextValue = !notifications[name];
    setSavingSetting(name);
    setSettingsMessage('');
    setSettingsError('');
    try {
      const response = await axios.patch('/admin/settings', {
        notifications: { [name]: nextValue },
      }, authConfig());
      setNotifications(response.data.settings.notifications);
      setSettingsMessage('Settings saved.');
    } catch (err) {
      setSettingsError(err.response?.data?.message || 'Failed to save setting');
    } finally {
      setSavingSetting('');
    }
  };

  const handlePreferenceChange = async (field, value) => {
    if (savingSetting || settingsLoading) return;
    setSavingSetting(field);
    setSettingsMessage('');
    setSettingsError('');
    
    // Update local state immediately
    setPreferences((current) => ({ ...current, [field]: value }));
    
    try {
      const response = await axios.patch('/admin/settings', {
        preferences: { [field]: value },
      }, authConfig());
      setPreferences(response.data.settings.preferences);
      setSettingsMessage('Preference saved.');
    } catch (err) {
      setSettingsError(err.response?.data?.message || 'Failed to save preference');
      // Revert on error
      setPreferences((current) => ({ ...current, [field]: preferences[field] }));
    } finally {
      setSavingSetting('');
    }
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    if (profileLoading) return;
    
    setProfileLoading(true);
    setProfileMessage('');
    setProfileError('');
    
    try {
      const response = await axios.patch('/admin/profile', profileData, authConfig());
      
      // Update localStorage with new values
      if (response.data.name) {
        localStorage.setItem('adminName', response.data.name);
        setAdminName(response.data.name);
      }
      if (response.data.email) {
        localStorage.setItem('adminEmail', response.data.email);
        setAdminEmail(response.data.email);
      }
      if (response.data.phone) {
        setAdminPhone(response.data.phone);
      }
      
      setProfileMessage(response.data.message || 'Profile updated successfully.');
      setTimeout(() => setIsEditingProfile(false), 2000);
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (passwordLoading) return;
    
    // Frontend validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    
    setPasswordLoading(true);
    setPasswordMessage('');
    setPasswordError('');
    
    try {
      const response = await axios.post('/admin/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, authConfig());
      
      setPasswordMessage(response.data.message || 'Password changed successfully.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setIsChangingPassword(false), 2000);
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
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
        {settingsLoading && <div className="settings-feedback settings-feedback-loading">Loading saved settings...</div>}
        {settingsError && <div className="settings-feedback settings-feedback-error">{settingsError}</div>}
        {settingsMessage && <div className="settings-feedback settings-feedback-success">{settingsMessage}</div>}
        <section className="settings-panel settings-profile-panel">
          <div className="settings-panel-heading">
            <div>
              <p className="settings-panel-kicker">Identity</p>
              <h2>Admin Profile</h2>
            </div>
            <button type="button" className="settings-secondary-btn" onClick={() => { setIsEditingProfile((current) => !current); setProfileMessage(''); setProfileError(''); }}>
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
                <input 
                  type="text" 
                  value={profileData.name} 
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  disabled={profileLoading}
                  required
                />
              </label>
              <label>
                <span>Email</span>
                <input 
                  type="email" 
                  value={profileData.email} 
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={profileLoading}
                  required
                />
              </label>
              <label>
                <span>Phone (optional)</span>
                <input 
                  type="text" 
                  value={profileData.phone} 
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={profileLoading}
                  placeholder="Enter phone number"
                />
              </label>
              <div className="settings-form-actions">
                <button type="submit" className="settings-primary-btn" disabled={profileLoading}>
                  {profileLoading ? 'Saving...' : 'Save Profile'}
                </button>
                {profileMessage && <span className="settings-form-success">{profileMessage}</span>}
                {profileError && <span className="settings-form-error">{profileError}</span>}
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
          <button type="button" className="settings-secondary-btn settings-wide-btn" onClick={() => { setIsChangingPassword((current) => !current); setPasswordMessage(''); setPasswordError(''); }}>
            {isChangingPassword ? 'Close Password Form' : 'Change Password'}
          </button>
          {isChangingPassword && (
            <form className="settings-form" onSubmit={handlePasswordSubmit}>
              <label>
                <span>Current Password</span>
                <input 
                  type="password" 
                  placeholder="Enter current password" 
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  disabled={passwordLoading}
                  required
                />
              </label>
              <label>
                <span>New Password</span>
                <input 
                  type="password" 
                  placeholder="Enter new password (min 6 characters)" 
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  disabled={passwordLoading}
                  required
                  minLength={6}
                />
              </label>
              <label>
                <span>Confirm Password</span>
                <input 
                  type="password" 
                  placeholder="Confirm new password" 
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  disabled={passwordLoading}
                  required
                  minLength={6}
                />
              </label>
              <div className="settings-form-actions">
                <button type="submit" className="settings-primary-btn" disabled={passwordLoading}>
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
                {passwordMessage && <span className="settings-form-success">{passwordMessage}</span>}
                {passwordError && <span className="settings-form-error">{passwordError}</span>}
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
              <input type="checkbox" checked={notifications.email} disabled={Boolean(savingSetting) || settingsLoading} onChange={() => toggleNotification('email')} />
            </label>
            <label className="settings-toggle-row">
              <span><strong>Booking notifications</strong><small>Show booking activity in your workspace.</small></span>
              <input type="checkbox" checked={notifications.bookings} disabled={Boolean(savingSetting) || settingsLoading} onChange={() => toggleNotification('bookings')} />
            </label>
            <label className="settings-toggle-row">
              <span><strong>New customer registrations</strong><small>Alert when a customer joins the platform.</small></span>
              <input type="checkbox" checked={notifications.registrations} disabled={Boolean(savingSetting) || settingsLoading} onChange={() => toggleNotification('registrations')} />
            </label>
          </div>
          <p className="settings-ui-note">{savingSetting ? `Saving ${savingSetting}...` : 'Notification preferences are saved to your admin account.'}</p>
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
              <select 
                value={preferences.density} 
                onChange={(event) => handlePreferenceChange('density', event.target.value)}
                disabled={Boolean(savingSetting) || settingsLoading}
              >
                <option value="comfortable">Comfortable</option>
                <option value="compact">Compact</option>
              </select>
            </label>
            <label>
              <span>Date display</span>
              <select 
                value={preferences.dateFormat} 
                onChange={(event) => handlePreferenceChange('dateFormat', event.target.value)}
                disabled={Boolean(savingSetting) || settingsLoading}
              >
                <option value="local">Local format</option>
                <option value="relative">Relative time</option>
              </select>
            </label>
          </div>
          <p className="settings-ui-note">{savingSetting && savingSetting !== 'email' && savingSetting !== 'bookings' && savingSetting !== 'registrations' ? `Saving ${savingSetting}...` : 'Preferences are saved to your admin account.'}</p>
        </section>

        <section className="settings-panel settings-system-panel">
          <div className="settings-panel-heading">
            <div>
              <p className="settings-panel-kicker">Environment</p>
              <h2>System Information</h2>
            </div>
          </div>
          <dl className="settings-system-list">
            <div><dt>Application</dt><dd>Mechze</dd></div>
          </dl>
          <p className="settings-ui-note">System information is read-only.</p>
        </section>
      </div>
    </div>
  );
};

export default AdminSettings;
