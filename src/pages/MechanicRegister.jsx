
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
    baseVisitingCharge: '',
    includedDistanceKm: '',
    extraChargePerKm: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState(null);
  const [fetchingLocation, setFetchingLocation] = useState(false);

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

  // ✅ Get location using browser geolocation API
  const getLocation = async () => {
    setFetchingLocation(true);
    if (!navigator.geolocation) {
      setMessage('❌ Geolocation not supported on this browser');
      setFetchingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lng = parseFloat(position.coords.longitude);
        const lat = parseFloat(position.coords.latitude);
        
        if (isNaN(lng) || isNaN(lat)) {
          setMessage('❌ Failed to fetch valid coordinates');
          setFetchingLocation(false);
          return;
        }

        setLocation({
          type: 'Point',
          coordinates: [lng, lat],
        });
        setMessage('✅ Location fetched successfully!');
        setFetchingLocation(false);
      },
      (error) => {
        console.error('Location error:', error);
        setMessage('❌ Unable to fetch location. Please enable location services.');
        setFetchingLocation(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Location validation
    if (!location) {
      return setMessage('❌ Please fetch your location before submitting');
    }

    // Pricing validation
    const baseCharge = parseFloat(formData.baseVisitingCharge) || 0;
    const includedDist = parseFloat(formData.includedDistanceKm) || 0;
    const extraCharge = parseFloat(formData.extraChargePerKm) || 0;

    if (baseCharge < 50 || baseCharge > 5000) {
      return setMessage('❌ Base visiting charge must be between ₹50 and ₹5000');
    }

    if (includedDist < 0 || includedDist > 100) {
      return setMessage('❌ Included distance must be between 0 and 100 km');
    }

    if (extraCharge < 5 || extraCharge > 500) {
      return setMessage('❌ Extra charge per km must be between ₹5 and ₹500');
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

      // Append pricing fields
      data.append('baseVisitingCharge', formData.baseVisitingCharge);
      data.append('includedDistanceKm', formData.includedDistanceKm);
      data.append('extraChargePerKm', formData.extraChargePerKm);

      // Append array fields
      formData.vehicleTypes.forEach((item) => data.append('vehicleTypes', item));
      formData.servicesOffered.forEach((item) => data.append('servicesOffered', item));

      // Append files
      if (profileImage) data.append('profileImage', profileImage);
      Array.from(documents).forEach((file) => data.append('documents', file));

      // Append location coordinates
      data.append('location[coordinates][]', location.coordinates[0]);
      data.append('location[coordinates][]', location.coordinates[1]);

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
          baseVisitingCharge: '',
          includedDistanceKm: '',
          extraChargePerKm: '',
        });
        setProfileImage(null);
        setDocuments([]);
        setLocation(null);
      }
    } catch (err) {
      console.error('❌ Registration failed:', err.message);
      setMessage('❌ Registration failed. Please check all fields and try again.');
    }
  };

  return (
    <div className="mechanic-register">
      <h2>Mechanic Registration</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Basic Information */}
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required /><br />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required /><br />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required /><br />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required /><br />
        <input name="experienceYears" type="number" value={formData.experienceYears} onChange={handleChange} placeholder="Experience (years)" required /><br />

        {/* Vehicle & Services */}
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

        {/* ✅ Pricing Information */}
        <fieldset style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <legend style={{ fontWeight: 'bold', fontSize: '16px' }}>💰 Pricing Configuration</legend>
          
          <label htmlFor="baseVisitingCharge">Base Visiting Charge (₹)</label><br />
          <input 
            id="baseVisitingCharge"
            name="baseVisitingCharge" 
            type="number" 
            step="10"
            min="50"
            max="5000"
            value={formData.baseVisitingCharge} 
            onChange={handleChange} 
            placeholder="50 - 5000" 
            required 
          /><br />

          <label htmlFor="includedDistanceKm">Included Distance (km)</label><br />
          <input 
            id="includedDistanceKm"
            name="includedDistanceKm" 
            type="number" 
            step="1"
            min="0"
            max="100"
            value={formData.includedDistanceKm} 
            onChange={handleChange} 
            placeholder="0 - 100" 
            required 
          /><br />

          <label htmlFor="extraChargePerKm">Extra Charge Per Km (₹)</label><br />
          <input 
            id="extraChargePerKm"
            name="extraChargePerKm" 
            type="number" 
            step="5"
            min="5"
            max="500"
            value={formData.extraChargePerKm} 
            onChange={handleChange} 
            placeholder="5 - 500" 
            required 
          /><br />
        </fieldset>

        {/* ✅ Location */}
        <fieldset style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <legend style={{ fontWeight: 'bold', fontSize: '16px' }}>📍 Service Location</legend>
          
          <button 
            type="button" 
            onClick={getLocation}
            disabled={fetchingLocation}
            style={{
              padding: '10px 20px',
              backgroundColor: location ? '#4CAF50' : '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: fetchingLocation ? 'not-allowed' : 'pointer',
              opacity: fetchingLocation ? 0.6 : 1
            }}
          >
            {fetchingLocation ? '⏳ Fetching Location...' : (location ? '✅ Location Fetched' : '📍 Get Current Location')}
          </button><br /><br />

          {location && (
            <div style={{ padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '6px', marginBottom: '10px' }}>
              <strong>Location:</strong><br />
              Latitude: {location.coordinates[1].toFixed(6)}<br />
              Longitude: {location.coordinates[0].toFixed(6)}
            </div>
          )}
        </fieldset>

        {/* Files */}
        <label htmlFor="profileImage" style={{ marginTop: '20px', display: 'block', fontWeight: 'bold' }}>Profile Image:</label><br />
        <input 
          id="profileImage"
          type="file" 
          accept="image/*" 
          onChange={(e) => setProfileImage(e.target.files[0])} 
          required 
        /><br />

        <label htmlFor="documents" style={{ marginTop: '15px', display: 'block', fontWeight: 'bold' }}>ID + License Documents:</label><br />
        <input 
          id="documents"
          type="file" 
          accept=".jpg,.jpeg,.png,.pdf" 
          multiple 
          onChange={(e) => handleFileChange(e, setDocuments)} 
          required 
        /><br />

        <button type="submit" style={{ marginTop: '20px', padding: '12px 30px', fontSize: '16px' }}>Register Mechanic</button>
      </form>
      {message && <p className="message" style={{ marginTop: '15px', padding: '10px', textAlign: 'center' }}>{message}</p>}
    </div>
  );
};

export default MechanicRegister;