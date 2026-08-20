import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import './AdminMechanicDetail.css';

const AdminMechanicDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const [mechanic, setMechanic] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingStats, setBookingStats] = useState({});
  const [bookingCount, setBookingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMechanic = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`/admin/mechanics/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMechanic(response.data.mechanic);
        setBookings(response.data.bookings || []);
        setBookingStats(response.data.bookingStats || {});
        setBookingCount(response.data.bookingCount || 0);
      } catch (err) {
        const status = err.response?.status;
        const message = err.response?.data?.message || 'Failed to load mechanic details';
        if (status === 401 || status === 403) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminEmail');
          navigate('/admin/login');
        } else {
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMechanic();
  }, [id, navigate, token]);

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAvatar = () => {
    if (mechanic?.profileImage) {
      return <img src={mechanic.profileImage} alt={mechanic.name} className="mechanic-detail-avatar-img" />;
    }
    return <div className="mechanic-detail-avatar-fallback">{mechanic?.name?.charAt(0).toUpperCase() || '?'}</div>;
  };

  const statusClass = (status) => `mechanic-detail-status mechanic-detail-status-${status || 'unknown'}`;

  if (loading) {
    return <div className="admin-mechanic-detail-page"><div className="mechanic-detail-loading"><div className="mechanic-detail-spinner" /><p>Loading mechanic details...</p></div></div>;
  }

  if (error) {
    return (
      <div className="admin-mechanic-detail-page">
        <button type="button" className="mechanic-detail-back-btn" onClick={() => navigate('/admin/mechanics')}>Back to Mechanics</button>
        <div className="mechanic-detail-error">{error}</div>
      </div>
    );
  }

  if (!mechanic) return null;

  return (
    <div className="admin-mechanic-detail-page">
      <button type="button" className="mechanic-detail-back-btn" onClick={() => navigate('/admin/mechanics')}>Back to Mechanics</button>

      <section className="mechanic-detail-profile-card">
        <div className="mechanic-detail-avatar">{getAvatar()}</div>
        <div className="mechanic-detail-profile-info">
          <h1>{mechanic.name}</h1>
          <p>Registered {formatDate(mechanic.createdAt)}</p>
        </div>
        <div className="mechanic-detail-statuses">
          <span className={statusClass(mechanic.verificationStatus)}>{mechanic.verificationStatus || 'Unknown'}</span>
          <span className={statusClass(mechanic.currentStatus)}>{mechanic.currentStatus || 'Unknown'}</span>
        </div>
      </section>

      <section className="mechanic-detail-section">
        <h2>Profile Information</h2>
        <div className="mechanic-detail-grid">
          <div><span>Email</span><strong>{mechanic.email || 'Not provided'}</strong></div>
          <div><span>Phone</span><strong>{mechanic.phone || 'Not provided'}</strong></div>
          <div><span>Experience</span><strong>{mechanic.experienceYears ?? 0} years</strong></div>
          <div><span>Service Radius</span><strong>{mechanic.serviceRadius ?? 0} km</strong></div>
          <div><span>Vehicles</span><strong>{mechanic.vehicleTypes?.join(', ') || 'Not provided'}</strong></div>
          <div><span>Services</span><strong>{mechanic.servicesOffered?.join(', ') || 'Not provided'}</strong></div>
          <div><span>Verified Flag</span><strong>{mechanic.isVerified ? 'Yes' : 'No'}</strong></div>
          <div><span>Registered</span><strong>{formatDate(mechanic.createdAt)}</strong></div>
        </div>
      </section>

      <section className="mechanic-detail-stats">
        <div><strong>{bookingCount}</strong><span>Total Bookings</span></div>
        <div><strong>{bookingStats.pending || 0}</strong><span>Pending</span></div>
        <div><strong>{bookingStats.accepted || 0}</strong><span>Accepted</span></div>
        <div><strong>{bookingStats.completed || 0}</strong><span>Completed</span></div>
      </section>

      <section className="mechanic-detail-section">
        <h2>Booking History</h2>
        {bookings.length === 0 ? (
          <p className="mechanic-detail-empty">No bookings found for this mechanic.</p>
        ) : (
          <div className="mechanic-detail-bookings-wrapper">
            <table className="mechanic-detail-bookings">
              <thead><tr><th>Status</th><th>Vehicle</th><th>Service</th><th>Scheduled</th><th>Created</th></tr></thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td><span className={statusClass(booking.status)}>{booking.status}</span></td>
                    <td>{booking.vehicleType || '—'}</td>
                    <td>{booking.serviceType || booking.problemDescription || '—'}</td>
                    <td>{formatDateTime(booking.scheduledTime)}</td>
                    <td>{formatDateTime(booking.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminMechanicDetail;
