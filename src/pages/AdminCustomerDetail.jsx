import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './AdminCustomerDetail.css';

const AdminCustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const [customer, setCustomer] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingCount, setBookingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axios.get(`/admin/customers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCustomer(response.data.customer);
        setBookings(response.data.bookings);
        setBookingCount(response.data.bookingCount);
      } catch (err) {
        const status = err.response?.status;
        const message = err.response?.data?.message || 'Failed to load customer details';

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

    fetchCustomerDetail();
  }, [id, token, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAvatar = () => {
    if (customer?.profileImage) {
      return <img src={customer.profileImage} alt={customer.name} className="detail-avatar-img" />;
    }
    return (
      <div className="detail-avatar-fallback">
        {customer?.name?.charAt(0).toUpperCase() || '?'}
      </div>
    );
  };

  const getBookingStatusClass = (status) => {
    const map = {
      pending: 'status-pending',
      accepted: 'status-accepted',
      completed: 'status-completed',
      rejected: 'status-rejected',
      cancelled: 'status-cancelled',
    };
    return map[status] || '';
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="customer-detail-page">
        <div className="detail-loading-state">
          <div className="loading-spinner"></div>
          <p>Loading customer details...</p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="customer-detail-page">
        <button className="detail-back-btn" onClick={() => navigate('/admin/customers')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back to Customers
        </button>
        <div className="detail-error-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {error}
        </div>
      </div>
    );
  }

  if (!customer) return null;

  return (
    <div className="customer-detail-page">

      {/* ── Back Navigation ── */}
      <button
        id="detail-back-to-customers"
        className="detail-back-btn"
        onClick={() => navigate('/admin/customers')}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Customers
      </button>

      {/* ── Profile Header ── */}
      <div className="detail-profile-card">
        <div className="detail-avatar-large">
          {getAvatar()}
        </div>

        <div className="detail-profile-info">
          <h1 className="detail-customer-name">{customer.name}</h1>
          <div className="detail-profile-meta">
            <span className={`status-badge ${customer.isDeleted ? 'status-deleted' : 'status-active'}`}>
              {customer.isDeleted ? 'Deleted' : 'Active'}
            </span>
            {customer.createdAt && (
              <span className="detail-joined-label">
                Joined {formatDate(customer.createdAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Contact Information ── */}
      <div className="detail-section">
        <h2 className="detail-section-title">Contact Information</h2>
        <div className="detail-info-grid">

          <div className="detail-info-item">
            <span className="detail-info-label">Email</span>
            <span className={`detail-info-value${!customer.email ? ' empty' : ''}`}>
              {customer.email || 'Not provided'}
            </span>
          </div>

          <div className="detail-info-item">
            <span className="detail-info-label">Phone</span>
            <span className={`detail-info-value mono${!customer.phone ? ' empty' : ''}`}>
              {customer.phone || 'Not provided'}
            </span>
          </div>

          <div className="detail-info-item">
            <span className="detail-info-label">Address</span>
            <span className={`detail-info-value${!customer.address ? ' empty' : ''}`}>
              {customer.address || 'Not provided'}
            </span>
          </div>

          <div className="detail-info-item">
            <span className="detail-info-label">Customer ID</span>
            <span className="detail-info-value mono">{customer._id}</span>
          </div>

        </div>
      </div>

      {/* ── Account Status ── */}
      <div className="detail-section">
        <h2 className="detail-section-title">Account Status</h2>
        <div className="detail-info-grid">

          <div className="detail-info-item">
            <span className="detail-info-label">Status</span>
            <span className="detail-info-value">
              <span className={`status-badge ${customer.isDeleted ? 'status-deleted' : 'status-active'}`}>
                {customer.isDeleted ? 'Deleted' : 'Active'}
              </span>
            </span>
          </div>

          <div className="detail-info-item">
            <span className="detail-info-label">Registered</span>
            <span className="detail-info-value">{formatDateTime(customer.createdAt)}</span>
          </div>

          {customer.isDeleted && (
            <>
              <div className="detail-info-item">
                <span className="detail-info-label">Deletion Requested</span>
                <span className="detail-info-value">
                  {formatDateTime(customer.deletionRequestedAt)}
                </span>
              </div>

              <div className="detail-info-item">
                <span className="detail-info-label">Deleted At</span>
                <span className="detail-info-value">
                  {formatDateTime(customer.deletedAt)}
                </span>
              </div>
            </>
          )}

        </div>
      </div>

      {/* ── Booking Stats ── */}
      <div className="detail-stats-row">
        <div className="detail-stat-card">
          <div className="detail-stat-number">{bookingCount}</div>
          <div className="detail-stat-label">Total Bookings</div>
        </div>
        <div className="detail-stat-card">
          <div className="detail-stat-number">
            {bookings.filter((b) => b.status === 'completed').length}
          </div>
          <div className="detail-stat-label">Completed</div>
        </div>
        <div className="detail-stat-card">
          <div className="detail-stat-number">
            {bookings.filter((b) => b.status === 'pending' || b.status === 'accepted').length}
          </div>
          <div className="detail-stat-label">Active</div>
        </div>
      </div>

      {/* ── Booking History ── */}
      <div className="detail-section-title" style={{ marginBottom: 16 }}>
        Booking History
      </div>

      {bookings.length === 0 ? (
        <div className="detail-bookings-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <p>No bookings found for this customer</p>
        </div>
      ) : (
        <div className="detail-bookings-table-wrapper">
          <table className="detail-bookings-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Mechanic</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="booking-id-cell">
                    ...{String(booking._id).slice(-8)}
                  </td>
                  <td>{booking.vehicleType || '—'}</td>
                  <td>{booking.serviceType || booking.problemDescription || '—'}</td>
                  <td>{booking.mechanic?.name || <span style={{ color: 'var(--color-steel)', fontStyle: 'italic' }}>Unassigned</span>}</td>
                  <td>
                    <span className={`booking-status ${getBookingStatusClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <span className={`payment-badge ${booking.payment?.status === 'paid' ? 'paid' : 'pending'}`}>
                      {booking.payment?.status || 'pending'}
                    </span>
                  </td>
                  <td>
                    {booking.payment?.amount != null
                      ? `₹${booking.payment.amount}`
                      : '—'}
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {formatDate(booking.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default AdminCustomerDetail;
