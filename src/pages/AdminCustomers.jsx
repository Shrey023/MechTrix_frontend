import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './AdminCustomers.css';

const AdminCustomers = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });

  const [filters, setFilters] = useState({
    search: '',
    status: 'active',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
    limit: 20,
  });

  const [searchInput, setSearchInput] = useState('');

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const params = new URLSearchParams();
      params.append('page', filters.page);
      params.append('limit', filters.limit);
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

      const response = await axios.get(`/admin/customers?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCustomers(response.data.customers);
      setPagination(response.data.pagination);
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Failed to load customers';

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
  }, [filters, token, navigate]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, filters.search]);

  const handleStatusChange = (status) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  };

  const handleSort = (sortBy) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder: prev.sortBy === sortBy && prev.sortOrder === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setFilters((prev) => ({ ...prev, page: newPage }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getAvatar = (customer) => {
    if (customer.profileImage) {
      return <img src={customer.profileImage} alt={customer.name} className="customer-avatar-img" />;
    }
    return <div className="customer-avatar-fallback">{customer.name.charAt(0).toUpperCase()}</div>;
  };

  if (loading && customers.length === 0) {
    return (
      <div className="admin-customers-page">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-customers-page">
      {/* Header */}
      <div className="customers-header">
        <h1 className="customers-title">CUSTOMERS</h1>
        <span className="customers-count">({pagination.totalItems} total)</span>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="error-banner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {error}
        </div>
      )}

      {/* Filters Bar */}
      <div className="filters-bar">
        <div className="search-wrapper">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, or phone..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className="status-filter">
          <label>Status:</label>
          <select value={filters.status} onChange={(e) => handleStatusChange(e.target.value)}>
            <option value="active">Active</option>
            <option value="deleted">Deleted</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {!loading && !error && customers.length === 0 && (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <h3>No customers found</h3>
          <p>
            {filters.search
              ? 'Try adjusting your search or filters'
              : "Customers will appear here once users register"}
          </p>
        </div>
      )}

      {/* Customers Table */}
      {!loading && !error && customers.length > 0 && (
        <>
          <div className="table-wrapper">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th
                    className="sortable"
                    onClick={() => handleSort('name')}
                  >
                    Name
                    {filters.sortBy === 'name' && (
                      <span className="sort-indicator">{filters.sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th
                    className="sortable"
                    onClick={() => handleSort('email')}
                  >
                    Email
                    {filters.sortBy === 'email' && (
                      <span className="sort-indicator">{filters.sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th
                    className="sortable"
                    onClick={() => handleSort('phone')}
                  >
                    Phone
                    {filters.sortBy === 'phone' && (
                      <span className="sort-indicator">{filters.sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th
                    className="sortable"
                    onClick={() => handleSort('createdAt')}
                  >
                    Joined
                    {filters.sortBy === 'createdAt' && (
                      <span className="sort-indicator">{filters.sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th>Bookings</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer._id}
                    onClick={() => navigate(`/admin/customers/${customer._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="customer-avatar-cell">{getAvatar(customer)}</td>
                    <td className="customer-name">{customer.name}</td>
                    <td className="customer-email">{customer.email}</td>
                    <td className="customer-phone">{customer.phone}</td>
                    <td className="customer-date">{formatDate(customer.createdAt)}</td>
                    <td className="customer-bookings">{customer.bookingCount}</td>
                    <td>
                      <span className={`status-badge ${customer.isDeleted ? 'status-deleted' : 'status-active'}`}>
                        {customer.isDeleted ? 'Deleted' : 'Active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Previous
              </button>

              <span className="pagination-info">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminCustomers;
