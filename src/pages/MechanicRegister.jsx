
import React, { useState } from 'react';
import axios from '../api/axios';
import './MechanicRegister.css';

const MechanicRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    experienceYears: '',
    vehicleTypes: [],
    servicesOffered: [],
    serviceRadius: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.multiple) {
      const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
      setFormData((prev) => ({ ...prev, [name]: selected }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e, setState) => {
    setState(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!navigator.geolocation) {
      return setMessage('Geolocation not supported');
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lng = parseFloat(position.coords.longitude);
      const lat = parseFloat(position.coords.latitude);

      if (isNaN(lng) || isNaN(lat)) {
        return setMessage('❌ Failed to fetch valid coordinates');
      }

      try {
        const data = new FormData();

        // Append primitive fields
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('password', formData.password);
        data.append('phone', formData.phone);
        data.append('experienceYears', formData.experienceYears);
        data.append('serviceRadius', formData.serviceRadius);

        // Append array fields
        formData.vehicleTypes.forEach((item) => data.append('vehicleTypes', item));
        formData.servicesOffered.forEach((item) => data.append('servicesOffered', item));

        // Append files
        if (profileImage) data.append('profileImage', profileImage);
        Array.from(documents).forEach((file) => data.append('documents', file));

        // Append coordinates
        data.append('location[coordinates][]', lng);
        data.append('location[coordinates][]', lat);

        const res = await axios.post('/auth/mechanic/register', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (res.status === 201) {
          setMessage('✅ Mechanic registered successfully!');
          setFormData({
            name: '',
            email: '',
            password: '',
            phone: '',
            experienceYears: '',
            vehicleTypes: [],
            servicesOffered: [],
            serviceRadius: '',
          });
          setProfileImage(null);
          setDocuments([]);
        }
      } catch (err) {
        console.error('❌ Registration failed:', err.message);
        setMessage('❌ Registration failed. Please check all fields and try again.');
      }
    });
  };

  return (
    <div className="mechanic-register">
      <h2>Mechanic Registration</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required /><br />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required /><br />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required /><br />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required /><br />
        <input name="experienceYears" type="number" value={formData.experienceYears} onChange={handleChange} placeholder="Experience (years)" required /><br />

        <label>Vehicle Types:</label><br />
        <select name="vehicleTypes" multiple onChange={handleChange} required>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="truck">Truck</option>
        </select><br />

        <label>Services Offered:</label><br />
        <select name="servicesOffered" multiple onChange={handleChange} required>
          <option value="engine repair">Engine Repair</option>
          <option value="oil change">Oil Change</option>
          <option value="brake repair">Brake Repair</option>
          <option value="battery jumpstart">Battery Jumpstart</option>
        </select><br />

        <input name="serviceRadius" type="number" placeholder="Service Radius (km)" value={formData.serviceRadius} onChange={handleChange} required /><br />

        <label>Profile Image:</label><br />
        <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} required /><br />

        <label>ID + License Documents:</label><br />
        <input type="file" accept=".jpg,.jpeg,.png,.pdf" multiple onChange={(e) => handleFileChange(e, setDocuments)} required /><br />

        <button type="submit">Register Mechanic</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default MechanicRegister;