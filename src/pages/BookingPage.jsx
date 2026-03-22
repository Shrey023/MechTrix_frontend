import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import './BookingPage.css';

const BookingPage = () => {
  const { id } = useParams();
  const [mechanic, setMechanic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    vehicleType: '',
    issueDescription: '',
    serviceRequired: '',
    scheduledTime: ''
  });
  const [message, setMessage] = useState('');
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  const customerId = localStorage.getItem('customerId');
  const isCustomerLoggedIn = Boolean(customerId && localStorage.getItem('token'));

  // Fetch mechanic details
  useEffect(() => {
    const fetchMechanic = async () => {
      try {
        const res = await axios.get(`/mechanics/${id}`);
        setMechanic(res.data);
      } catch (err) {
        console.error("❌ Mechanic fetch failed:", err.response?.data || err.message);
        setMessage('❌ Mechanic not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchMechanic();
  }, [id]);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.error("❌ Geolocation error:", err.message);
          setMessage('❌ Could not get your location. Please allow location access.');
        }
      );
    } else {
      setMessage('❌ Geolocation not supported by this browser.');
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCustomerLoggedIn) {
      setMessage('Please login or register first to make a booking.');
      return;
    }

    if (!userLocation.lat || !userLocation.lng) {
      return setMessage('❌ Location not available. Please allow location access.');
    }

    try {
      const coords = [userLocation.lng, userLocation.lat]; // GeoJSON format: [lng, lat]

      const bookingData = {
        customerId,
        mechanicId: mechanic._id,
        vehicleType: form.vehicleType,
        problemDescription: form.issueDescription, // ✅ Updated field name
        serviceType: form.serviceRequired,         // ✅ Updated field name
        scheduledTime: form.scheduledTime,
        location: {
          type: 'Point',
          coordinates: coords,
        },
        payment: {
          mode: 'cash',
          status: 'pending',
          amount: 0,
        }
      };

      await axios.post('/bookings', bookingData);
      setMessage('✅ Booking successful!');
    } catch (err) {
      console.error('❌ Booking failed:', err.response?.data || err.message);
      setMessage('❌ Booking failed. Please try again.');
    }
  };

  if (loading) return <p className="loading-text">⏳ Loading mechanic info...</p>;
  if (!mechanic) return <p className="error-text">{message || '❌ Mechanic not found.'}</p>;

  return (
    <div className="booking-page" style={{ padding: '1rem' }}>
      <h2 className="mechanic-title">Book {mechanic.name}</h2>
      <p className="mechanic-info"><strong>Experience:</strong> {mechanic.experienceYears} years</p>
      <p className="mechanic-info"><strong>Services:</strong> {mechanic.servicesOffered?.join(', ')}</p>
      <p className="mechanic-info"><strong>Vehicle Types:</strong> {mechanic.vehicleTypes?.join(', ')}</p>

      <form onSubmit={handleSubmit} className="booking-form" style={{ marginTop: '1rem' }}>
        {!isCustomerLoggedIn && (
          <div className="message error">
            Please login or register first. Booking is disabled until you sign in.
          </div>
        )}

        <input
          name="vehicleType"
          value={form.vehicleType}
          onChange={handleChange}
          placeholder="Vehicle Type"
          className="input-field"
          disabled={!isCustomerLoggedIn}
          required
        />
        <textarea
          name="issueDescription"
          value={form.issueDescription}
          onChange={handleChange}
          placeholder="Issue Description"
          className="input-field textarea"
          disabled={!isCustomerLoggedIn}
          required
        />
        <input
          name="serviceRequired"
          value={form.serviceRequired}
          onChange={handleChange}
          placeholder="Service Required"
          className="input-field"
          disabled={!isCustomerLoggedIn}
          required
        />
        <input
          type="datetime-local"
          name="scheduledTime"
          value={form.scheduledTime}
          onChange={handleChange}
          className="input-field"
          disabled={!isCustomerLoggedIn}
          required
        />
        <button type="submit" className="submit-button" disabled={!isCustomerLoggedIn}>
          {isCustomerLoggedIn ? 'Confirm Booking' : 'Login Required'}
        </button>

        {!isCustomerLoggedIn && (
          <div className="booking-auth-actions">
            <Link to="/login" className="dashboard-button">Login</Link>
            <Link to="/Userregister" className="dashboard-button">Register</Link>
          </div>
        )}
      </form>

      {message && <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>}

      <Link to="/dashboard">
        <button className="dashboard-button" style={{ marginTop: '1rem' }}>Go to My Dashboard</button>
      </Link>
    </div>
  );
};

export default BookingPage;
