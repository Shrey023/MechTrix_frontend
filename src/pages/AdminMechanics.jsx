import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './AdminMechanics.css';

const initialFilters = {
  search: '',
  verificationStatus: '',
  isVerified: '',
  currentStatus: '',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  page: 1,
  limit: 20,
  startDate: '',
  endDate: '',
};

const AdminMechanics = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const [mechanics, setMechanics] = useState([]);
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

  const fetchMechanics = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== '') params.append(key, value);
      });

      const response = await axios.get(`/admin/mechanics?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMechanics(response.data.mechanics);
      setPagination(response.data.pagination);
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Failed to load mechanics';
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
    fetchMechanics();
  }, [fetchMechanics]);

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

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getAvatar = (mechanic) => {
    if (mechanic.profileImage) {
      return <img src={mechanic.profileImage} alt={mechanic.name} className="mechanic-avatar-img" />;
    }
    return <div className="mechanic-avatar-fallback">{mechanic.name?.charAt(0).toUpperCase() || '?'}</div>;
  };

  const statusClass = (status) => `mechanic-status mechanic-status-${status || 'unknown'}`;

  if (loading && mechanics.length === 0) {
    return (
      <div className="admin-mechanics-page">
        <div className="mechanics-loading-state"><div className="mechanics-spinner" /><p>Loading mechanics...</p></div>
      </div>
    );
  }

  return (
    <div className="admin-mechanics-page">
      <div className="mechanics-header">
        <h1 className="mechanics-title">MECHANICS</h1>
        <span className="mechanics-count">({pagination.totalItems} total)</span>
      </div>

      {error && <div className="mechanics-error-banner">{error}</div>}

      <div className="mechanics-filters-bar">
        <div className="mechanics-search-wrapper">
          <input
            type="text"
            className="mechanics-search-input"
            placeholder="Search by name, email, phone, service, or vehicle..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <label className="mechanics-filter">
          <span>Verification</span>
          <select value={filters.verificationStatus} onChange={(event) => updateFilter('verificationStatus', event.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
        <label className="mechanics-filter">
          <span>Verified</span>
          <select value={filters.isVerified} onChange={(event) => updateFilter('isVerified', event.target.value)}>
            <option value="">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
        <label className="mechanics-filter">
          <span>Availability</span>
          <select value={filters.currentStatus} onChange={(event) => updateFilter('currentStatus', event.target.value)}>
            <option value="">All</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="offline">Offline</option>
          </select>
        </label>
        <label className="mechanics-filter mechanics-date-filter">
          <span>From</span>
          <input type="date" value={filters.startDate} onChange={(event) => updateFilter('startDate', event.target.value)} />
        </label>
        <label className="mechanics-filter mechanics-date-filter">
          <span>To</span>
          <input type="date" value={filters.endDate} onChange={(event) => updateFilter('endDate', event.target.value)} />
        </label>
      </div>

      {!loading && !error && mechanics.length === 0 && (
        <div className="mechanics-empty-state">
          <div className="mechanics-empty-icon">M</div>
          <h3>No mechanics found</h3>
          <p>{filters.search ? 'Try adjusting your search or filters' : 'Mechanics will appear here once they register'}</p>
        </div>
      )}

      {!error && mechanics.length > 0 && (
        <>
          <div className="mechanics-table-wrapper">
            <table className="mechanics-table">
              <thead>
                <tr>
                  <th>Mechanic</th>
                  <th className="mechanics-sortable" onClick={() => handleSort('name')}>Name {filters.sortBy === 'name' && <span> {filters.sortOrder === 'asc' ? '↑' : '↓'}</span>}</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Services</th>
                  <th>Vehicles</th>
                  <th className="mechanics-sortable" onClick={() => handleSort('verificationStatus')}>Verification</th>
                  <th className="mechanics-sortable" onClick={() => handleSort('currentStatus')}>Availability</th>
                  <th className="mechanics-sortable" onClick={() => handleSort('createdAt')}>Joined</th>
                  <th className="mechanics-sortable" onClick={() => handleSort('bookingCount')}>Bookings</th>
                </tr>
              </thead>
              <tbody>
                {mechanics.map((mechanic) => (
                  <tr key={mechanic._id} onClick={() => navigate(`/admin/mechanics/${mechanic._id}`)}>
                    <td className="mechanic-avatar-cell">{getAvatar(mechanic)}</td>
                    <td className="mechanic-name-cell">{mechanic.name}</td>
                    <td className="mechanic-email-cell">{mechanic.email}</td>
                    <td className="mechanic-phone-cell">{mechanic.phone}</td>
                    <td>{mechanic.servicesOffered?.join(', ') || '—'}</td>
                    <td>{mechanic.vehicleTypes?.join(', ') || '—'}</td>
                    <td><span className={statusClass(mechanic.verificationStatus)}>{mechanic.verificationStatus || 'Unknown'}</span></td>
                    <td><span className={statusClass(mechanic.currentStatus)}>{mechanic.currentStatus || 'Unknown'}</span></td>
                    <td className="mechanic-date-cell">{formatDate(mechanic.createdAt)}</td>
                    <td className="mechanic-bookings-cell">{mechanic.bookingCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="mechanics-pagination">
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

export default AdminMechanics;
