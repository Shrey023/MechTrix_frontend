import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import './CustomerProfile.css';

const CustomerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const customerId = localStorage.getItem('customerId');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/customers/${customerId}`);
        setProfile(res.data);
        setForm(res.data);
      } catch (err) {
        console.error('Failed to fetch customer profile:', err.message);
      }
    };

    fetchProfile();
  }, [customerId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`/customers/${customerId}`, form);
      setProfile(res.data);
      setEditMode(false);
    } catch (err) {
      console.error('Profile update failed:', err.message);
    }
  };

  if (!profile) return <p className="loading-text">Loading profile...</p>;

  return (
    <div className="customer-profile">
      <div className="profile-card">
        <h2>My Profile</h2>
        <p><strong>Avatar:</strong></p>
        <div className="customer-avatar" aria-hidden="true" style={{ marginBottom: '1rem' }}>
          {profile.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>

        <label className="profile-label">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={!editMode}
        />

        <label className="profile-label">Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled
        />

        <label className="profile-label">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          disabled={!editMode}
        />

        {editMode ? (
          <button onClick={handleSave} className="profile-save-btn">Save</button>
        ) : (
          <button onClick={() => setEditMode(true)} className="profile-save-btn">Edit</button>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
