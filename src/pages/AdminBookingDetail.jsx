import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import './AdminBookingDetail.css';

const AdminBookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const [booking, setBooking] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [mechanic, setMechanic] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`/admin/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(response.data.booking);
        setCustomer(response.data.customer);
        setMechanic(response.data.mechanic);
        setTimeline(response.data.timeline || []);
      } catch (err) {
        const status = err.response?.status;
        const message = err.response?.data?.message || 'Failed to load booking details';
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
    fetchBooking();
  }, [id, navigate, token]);

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusClass = (value) => `booking-detail-status booking-detail-status-${value || 'unknown'}`;

  if (loading) {
    return <div className="admin-booking-detail-page"><div className="booking-detail-loading"><div className="booking-detail-spinner" /><p>Loading booking details...</p></div></div>;
  }

  if (error) {
    return (
      <div className="admin-booking-detail-page">
        <button type="button" className="booking-detail-back-btn" onClick={() => navigate('/admin/bookings')}>Back to Bookings</button>
        <div className="booking-detail-error">{error}</div>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="admin-booking-detail-page">
      <button type="button" className="booking-detail-back-btn" onClick={() => navigate('/admin/bookings')}>Back to Bookings</button>

      <section className="booking-detail-hero">
        <div>
          <p className="booking-detail-eyebrow">Booking ...{String(booking._id).slice(-8)}</p>
          <h1>{booking.serviceType || 'Service request'}</h1>
          <p>Created {formatDate(booking.createdAt)}</p>
        </div>
        <span className={statusClass(booking.status)}>{booking.status || 'Unknown'}</span>
      </section>

      <section className="booking-detail-section">
        <h2>Booking Summary</h2>
        <div className="booking-detail-grid">
          <div><span>Booking ID</span><strong className="booking-detail-mono">{booking._id}</strong></div>
          <div><span>Status</span><strong><span className={statusClass(booking.status)}>{booking.status || 'Unknown'}</span></strong></div>
          <div><span>Service</span><strong>{booking.serviceType || 'Not provided'}</strong></div>
          <div><span>Vehicle</span><strong>{booking.vehicleType || 'Not provided'}</strong></div>
          <div><span>Scheduled Time</span><strong>{formatDate(booking.scheduledTime)}</strong></div>
          <div><span>Completed Time</span><strong>{formatDate(booking.completedAt)}</strong></div>
        </div>
      </section>

      <div className="booking-detail-two-column">
        <section className="booking-detail-section">
          <h2>Customer</h2>
          <div className="booking-detail-grid booking-detail-single-column">
            <div><span>Name</span><strong>{customer?.name || 'Unknown customer'}</strong></div>
            <div><span>Email</span><strong>{customer?.email || 'Not provided'}</strong></div>
            <div><span>Phone</span><strong>{customer?.phone || 'Not provided'}</strong></div>
          </div>
        </section>

        <section className="booking-detail-section">
          <h2>Mechanic</h2>
          <div className="booking-detail-grid booking-detail-single-column">
            <div><span>Name</span><strong>{mechanic?.name || 'Unassigned'}</strong></div>
            <div><span>Email</span><strong>{mechanic?.email || 'Not provided'}</strong></div>
            <div><span>Phone</span><strong>{mechanic?.phone || 'Not provided'}</strong></div>
          </div>
        </section>
      </div>

      <section className="booking-detail-section">
        <h2>Problem and Service Details</h2>
        <div className="booking-detail-description">{booking.problemDescription || 'No problem description provided.'}</div>
      </section>

      <div className="booking-detail-two-column">
        <section className="booking-detail-section">
          <h2>Payment Summary</h2>
          <div className="booking-detail-grid booking-detail-single-column">
            <div><span>Mode</span><strong>{booking.payment?.mode || 'Not provided'}</strong></div>
            <div><span>Status</span><strong><span className={statusClass(booking.payment?.status)}>{booking.payment?.status || 'Unknown'}</span></strong></div>
            <div><span>Amount</span><strong>{booking.payment?.amount != null ? `₹${booking.payment.amount}` : 'Not provided'}</strong></div>
          </div>
        </section>

        <section className="booking-detail-section">
          <h2>Platform Fee Summary</h2>
          <div className="booking-detail-grid booking-detail-single-column">
            <div><span>Amount</span><strong>{booking.platformFee?.amount != null ? `₹${booking.platformFee.amount}` : 'Not provided'}</strong></div>
            <div><span>Status</span><strong>{booking.platformFee?.status || 'Not provided'}</strong></div>
            <div><span>Paid Time</span><strong>{formatDate(booking.platformFee?.paidAt)}</strong></div>
          </div>
        </section>
      </div>

      <section className="booking-detail-section">
        <h2>Timeline</h2>
        {timeline.length === 0 ? (
          <p className="booking-detail-empty">No timeline timestamps available.</p>
        ) : (
          <ol className="booking-detail-timeline">
            {timeline.map((item) => (
              <li key={`${item.event}-${item.timestamp}`}>
                <span className="booking-detail-timeline-dot" />
                <div><strong>{item.event}</strong><span>{formatDate(item.timestamp)}</span></div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
};

export default AdminBookingDetail;
