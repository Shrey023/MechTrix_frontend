import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

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

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>My Profile</h2>
      <div style={{ marginTop: '1rem' }}>
        <label>Name:</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={!editMode}
        /><br />

        <label>Email:</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          disabled
        /><br />

        <label>Phone:</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          disabled={!editMode}
        /><br />

        {editMode ? (
          <button onClick={handleSave} style={{ marginTop: '1rem' }}>Save</button>
        ) : (
          <button onClick={() => setEditMode(true)} style={{ marginTop: '1rem' }}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;
