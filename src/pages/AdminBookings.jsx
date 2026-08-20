import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './AdminBookings.css';

const initialFilters = {
  search: '',
  status: '',
  paymentStatus: '',
  serviceType: '',
  vehicleType: '',
  startDate: '',
  endDate: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 20,
};

const statuses = ['pending', 'accepted', 'rejected', 'completed', 'cancelled'];

const AdminBookings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '') params.append(key, value);
      });

      const response = await axios.get(`/admin/bookings?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data.bookings || []);
      setPagination(response.data.pagination);
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Failed to load bookings';
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
  }, [filters, navigate, token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        setFilters((current) => ({ ...current, search: searchInput, page: 1 }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.search, searchInput]);

  const updateFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value, page: 1 }));
  };

  const handleSort = (sortBy) => {
    setFilters((current) => ({
      ...current,
      sortBy,
      sortOrder: current.sortBy === sortBy && current.sortOrder === 'desc' ? 'asc' : 'desc',
      page: 1,
    }));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      setFilters((current) => ({ ...current, page }));
    }
  };

  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleString('en-US', includeTime
      ? { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      : { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const statusClass = (value) => `booking-status booking-status-${value || 'unknown'}`;
  const bookingLabel = (booking) => `...${String(booking._id).slice(-8)}`;

  if (loading && bookings.length === 0) {
    return (
      <div className="admin-bookings-page">
        <div className="bookings-loading-state"><div className="bookings-spinner" /><p>Loading bookings...</p></div>
      </div>
    );
  }

  return (
    <div className="admin-bookings-page">
      <div className="bookings-header">
        <h1 className="bookings-title">BOOKINGS</h1>
        <span className="bookings-count">({pagination.totalItems} total)</span>
      </div>

      {error && <div className="bookings-error-banner">{error}</div>}

      <div className="bookings-filters-bar">
        <div className="bookings-search-wrapper">
          <input
            type="text"
            className="bookings-search-input"
            placeholder="Search booking, customer, mechanic, service, or problem..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <label className="bookings-filter">
          <span>Status</span>
          <select value={filters.status} onChange={(event) => updateFilter('status', event.target.value)}>
            <option value="">All</option>
            {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </label>
        <label className="bookings-filter">
          <span>Payment</span>
          <select value={filters.paymentStatus} onChange={(event) => updateFilter('paymentStatus', event.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
        </label>
        <label className="bookings-filter">
          <span>Service</span>
          <input type="text" value={filters.serviceType} onChange={(event) => updateFilter('serviceType', event.target.value)} placeholder="Any service" />
        </label>
        <label className="bookings-filter">
          <span>Vehicle</span>
          <input type="text" value={filters.vehicleType} onChange={(event) => updateFilter('vehicleType', event.target.value)} placeholder="Any vehicle" />
        </label>
        <label className="bookings-filter bookings-date-filter">
          <span>From</span>
          <input type="date" value={filters.startDate} onChange={(event) => updateFilter('startDate', event.target.value)} />
        </label>
        <label className="bookings-filter bookings-date-filter">
          <span>To</span>
          <input type="date" value={filters.endDate} onChange={(event) => updateFilter('endDate', event.target.value)} />
        </label>
      </div>

      {!loading && !error && bookings.length === 0 && (
        <div className="bookings-empty-state">
          <div className="bookings-empty-icon">B</div>
          <h3>No bookings found</h3>
          <p>{filters.search ? 'Try adjusting your search or filters' : 'Bookings will appear here when customers make requests'}</p>
        </div>
      )}

      {!error && bookings.length > 0 && (
        <>
          <div className="bookings-table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Mechanic</th>
                  <th className="bookings-sortable" onClick={() => handleSort('serviceType')}>Service {filters.sortBy === 'serviceType' && <span>{filters.sortOrder === 'asc' ? '↑' : '↓'}</span>}</th>
                  <th className="bookings-sortable" onClick={() => handleSort('vehicleType')}>Vehicle {filters.sortBy === 'vehicleType' && <span>{filters.sortOrder === 'asc' ? '↑' : '↓'}</span>}</th>
                  <th className="bookings-sortable" onClick={() => handleSort('scheduledTime')}>Scheduled {filters.sortBy === 'scheduledTime' && <span>{filters.sortOrder === 'asc' ? '↑' : '↓'}</span>}</th>
                  <th className="bookings-sortable" onClick={() => handleSort('status')}>Status {filters.sortBy === 'status' && <span>{filters.sortOrder === 'asc' ? '↑' : '↓'}</span>}</th>
                  <th>Payment</th>
                  <th className="bookings-sortable" onClick={() => handleSort('createdAt')}>Created {filters.sortBy === 'createdAt' && <span>{filters.sortOrder === 'asc' ? '↑' : '↓'}</span>}</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} onClick={() => navigate(`/admin/bookings/${booking._id}`)}>
                    <td className="booking-id-cell">{bookingLabel(booking)}</td>
                    <td>
                      <strong className="booking-person-name">{booking.customer?.name || 'Unknown customer'}</strong>
                      <span className="booking-person-secondary">{booking.customer?.email || '—'}</span>
                    </td>
                    <td>
                      <strong className="booking-person-name">{booking.mechanic?.name || 'Unassigned'}</strong>
                      <span className="booking-person-secondary">{booking.mechanic?.phone || '—'}</span>
                    </td>
                    <td>{booking.serviceType || '—'}</td>
                    <td>{booking.vehicleType || '—'}</td>
                    <td className="booking-date-cell">{formatDate(booking.scheduledTime, true)}</td>
                    <td><span className={statusClass(booking.status)}>{booking.status || 'Unknown'}</span></td>
                    <td><span className={statusClass(booking.payment?.status)}>{booking.payment?.status || 'Unknown'}</span></td>
                    <td className="booking-date-cell">{formatDate(booking.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="bookings-pagination">
              <button type="button" onClick={() => handlePageChange(pagination.currentPage - 1)} disabled={!pagination.hasPrevPage}>Previous</button>
              <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
              <button type="button" onClick={() => handlePageChange(pagination.currentPage + 1)} disabled={!pagination.hasNextPage}>Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBookings;
