// src/pages/MechanicDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import MechanicLocationSender from '../components/MechanicLocationSender';
import './MechanicDashboard.css';

const MechanicDashboard = () => {
  const [mechanic, setMechanic] = useState(null);
  const [bookings, setBookings] = useState({ pending: [], accepted: [], completed: [], rejected: [] });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [liveSharing, setLiveSharing] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProfile();
    fetchBookings();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/mechanic/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMechanic(res.data);
      setStatus(res.data.currentStatus);
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/mechanic/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
    }
  };

  const handleBookingAction = async (bookingId, action) => {
    try {
      await axios.post('/mechanic/bookings/respond', { bookingId, action }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBookings(); // refresh after action
    } catch (err) {
      console.error("❌ Action failed:", err);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      await axios.patch('/mechanic/status', { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus(newStatus);
    } catch (err) {
      console.error("❌ Status update failed:", err);
    }
  };

  const toggleLiveLocation = () => {
    setLiveSharing(prev => !prev);
    // Future: trigger geolocation sharing here
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading || !mechanic) return <p className="loading-text">Loading dashboard...</p>;

  return (
    <div className="dashboard">
      {liveSharing && <MechanicLocationSender />}

      {/* Profile Card */}
      <div className="profile-card">
        <img src={`/${mechanic.profileImage}`} alt="Profile" className="profile-image" />
        <div className="profile-details">
          <h2>{mechanic.name}</h2>
          <p>Status: <span className={`status-text status-${status}`}>{status}</span></p>
          <p>Experience: {mechanic.experienceYears} yrs | Radius: {mechanic.serviceRadius} km</p>
          <p>Vehicles: {mechanic.vehicleTypes.join(', ')}</p>
          <p>Services: {mechanic.servicesOffered.join(', ')}</p>
          <p>Orders Completed: {mechanic.ordersCompleted} | Earnings: ₹{mechanic.earnings}</p>
        </div>
        <div className="profile-actions">
          <select value={status} onChange={(e) => updateStatus(e.target.value)} className="status-select">
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
          <button onClick={toggleLiveLocation} className="location-button">
            {liveSharing ? 'Stop Location' : 'Start Location'}
          </button>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      </div>

      {/* Bookings Tabs */}
      <div className="bookings-section">
        <BookingSection title="🕒 Pending Bookings" bookings={bookings.pending} onAction={handleBookingAction} />
        <BookingSection title="✅ Accepted Bookings" bookings={bookings.accepted} onAction={handleBookingAction} />
        <BookingSection title="📜 Past Bookings" bookings={[...bookings.completed, ...bookings.rejected]} />
      </div>
    </div>
  );
};

const BookingSection = ({ title, bookings, onAction }) => {
  return (
    <div className="booking-section">
      <h3>{title}</h3>
      {bookings.length === 0 ? (
        <p className="no-bookings">No bookings</p>
      ) : (
        <div className="bookings-list">
          {bookings.map(b => (
            <div key={b._id} className="booking-card">
              <p><strong>Customer:</strong> {b.customer?.name}</p>
              <p><strong>Service:</strong> {b.serviceType}</p>
              {b.problemDescription && <p><strong>Problem:</strong> {b.problemDescription}</p>}
              <p><strong>Scheduled:</strong> {new Date(b.scheduledTime || b.createdAt).toLocaleString()}</p>

              {onAction && b.status === 'pending' && (
                <div className="booking-actions">
                  <button onClick={() => onAction(b._id, 'accept')} className="action-button accept">Accept</button>
                  <button onClick={() => onAction(b._id, 'reject')} className="action-button reject">Reject</button>
                </div>
              )}

              {onAction && b.status === 'accepted' && (
                <div className="booking-actions">
                  <button onClick={() => onAction(b._id, 'complete')} className="action-button complete">Mark as Completed</button>
                  <Link to={`/mechanic/navigate/${b._id}`}>
                    <button className="action-button navigate">Navigate</button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MechanicDashboard;