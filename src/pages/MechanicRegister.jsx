
import React, { useState } from 'react';
import axios from '../api/axios';
import './auth.css';
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
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="auth-form mechanic-register-card">
        <h2 className="auth-title">Mechanic Registration</h2>

        <label className="auth-label" htmlFor="name">Full Name</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />

        <label className="auth-label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />

        <label className="auth-label" htmlFor="password">Password</label>
        <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />

        <label className="auth-label" htmlFor="phone">Phone Number</label>
        <input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />

        <label className="auth-label" htmlFor="experienceYears">Experience (Years)</label>
        <input id="experienceYears" name="experienceYears" type="number" value={formData.experienceYears} onChange={handleChange} placeholder="Experience (years)" required />

        <label className="auth-label" htmlFor="vehicleTypes">Vehicle Types</label>
        <select id="vehicleTypes" name="vehicleTypes" multiple onChange={handleChange} required>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="truck">Truck</option>
        </select>

        <label className="auth-label" htmlFor="servicesOffered">Services Offered</label>
        <select id="servicesOffered" name="servicesOffered" multiple onChange={handleChange} required>
          <option value="engine repair">Engine Repair</option>
          <option value="oil change">Oil Change</option>
          <option value="brake repair">Brake Repair</option>
          <option value="battery jumpstart">Battery Jumpstart</option>
        </select>

        <label className="auth-label" htmlFor="serviceRadius">Service Radius (KM)</label>
        <input id="serviceRadius" name="serviceRadius" type="number" placeholder="Service Radius (km)" value={formData.serviceRadius} onChange={handleChange} required />

        <fieldset className="mechanic-section-fieldset">
          <legend>Pricing Configuration</legend>

          <label className="auth-label" htmlFor="baseVisitingCharge">Base Visiting Charge</label>
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
          />

          <label className="auth-label" htmlFor="includedDistanceKm">Included Distance (KM)</label>
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
          />

          <label className="auth-label" htmlFor="extraChargePerKm">Extra Charge Per KM</label>
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
          />
        </fieldset>

        <fieldset className="mechanic-section-fieldset">
          <legend>Service Location</legend>

          <button
            type="button"
            onClick={getLocation}
            disabled={fetchingLocation}
            className="mechanic-location-btn"
          >
            {fetchingLocation ? 'Fetching location...' : (location ? 'Location fetched' : 'Get current location')}
          </button>

          {location && (
            <div className="mechanic-location-preview">
              <strong>Location</strong>
              <p>Latitude: {location.coordinates[1].toFixed(6)}</p>
              <p>Longitude: {location.coordinates[0].toFixed(6)}</p>
            </div>
          )}
        </fieldset>

        <label className="auth-label" htmlFor="profileImage">Profile Image</label>
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
          required
        />

        <label className="auth-label" htmlFor="documents">ID and License Documents</label>
        <input
          id="documents"
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          multiple
          onChange={(e) => handleFileChange(e, setDocuments)}
          required
        />

        <button type="submit" className="auth-button">Register Mechanic</button>
        {message && <p className={message.startsWith('✅') ? 'auth-success' : 'auth-error'}>{message}</p>}
      </form>
    </div>
  );
};

export default MechanicRegister;