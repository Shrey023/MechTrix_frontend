import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken') || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [dateFilter, setDateFilter] = useState('30d'); // Default: Last 30 days
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  // Calculate date range based on filter
  const getDateRange = () => {
    const now = new Date();
    let startDate, endDate;

    switch (dateFilter) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        endDate = new Date();
        break;
      case '7d':
        startDate = new Date(now.setDate(now.getDate() - 7));
        endDate = new Date();
        break;
      case '30d':
        startDate = new Date(now.setDate(now.getDate() - 30));
        endDate = new Date();
        break;
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date();
        break;
      case 'lastMonth':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        startDate = lastMonth;
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          startDate = new Date(customStartDate);
          endDate = new Date(customEndDate);
        }
        break;
      default:
        return {};
    }

    return { startDate: startDate?.toISOString(), endDate: endDate?.toISOString() };
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError('');

        const dateRange = getDateRange();
        const params = new URLSearchParams();
        if (dateRange.startDate) params.append('startDate', dateRange.startDate);
        if (dateRange.endDate) params.append('endDate', dateRange.endDate);

        const res = await axios.get(`/admin/dashboard/analytics?${params.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setAnalytics(res.data.data);
        }
      } catch (err) {
        const status = err.response?.status;
        const message = err.response?.data?.message || 'Failed to fetch analytics';

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

    fetchAnalytics();
  }, [token, navigate, dateFilter, customStartDate, customEndDate]);

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="analytics-spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-error">
        <p>{error}</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="analytics-error">
        <p>No data available</p>
      </div>
    );
  }

  const { kpis, charts, recentActivity } = analytics;

  // Chart colors
  const COLORS = ['#834417', '#A85A2B', '#C97D4C', '#E6A77B', '#F4D1B5'];

  // Format currency
  const formatCurrency = (value) => {
    return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Format time ago
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="analytics-dashboard">
      {/* Header with Date Filter */}
      <div className="analytics-header">
        <h1 className="analytics-title">Analytics Dashboard</h1>
        <div className="analytics-filters">
          <select 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)}
            className="analytics-date-select"
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="custom">Custom Range</option>
          </select>

          {dateFilter === 'custom' && (
            <div className="analytics-custom-dates">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="analytics-date-input"
              />
              <span>to</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="analytics-date-input"
              />
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="analytics-kpi-grid">
        <div className="analytics-kpi-card">
          <div className="kpi-icon" style={{ background: 'linear-gradient(135deg, #834417 0%, #A85A2B 100%)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Total Customers</p>
            <p className="kpi-value">{kpis.customers.total.toLocaleString()}</p>
            <p className="kpi-detail">Active: {kpis.customers.active} | Deleted: {kpis.customers.deleted}</p>
          </div>
        </div>

        <div className="analytics-kpi-card">
          <div className="kpi-icon" style={{ background: 'linear-gradient(135deg, #A85A2B 0%, #C97D4C 100%)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Total Mechanics</p>
            <p className="kpi-value">{kpis.mechanics.total.toLocaleString()}</p>
            <p className="kpi-detail">Verified: {kpis.mechanics.verified} | Pending: {kpis.mechanics.pending}</p>
          </div>
        </div>

        <div className="analytics-kpi-card">
          <div className="kpi-icon" style={{ background: 'linear-gradient(135deg, #C97D4C 0%, #E6A77B 100%)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Total Bookings</p>
            <p className="kpi-value">{kpis.bookings.total.toLocaleString()}</p>
            <p className="kpi-detail">Completed: {kpis.bookings.completed} | Pending: {kpis.bookings.pending}</p>
          </div>
        </div>

        <div className="analytics-kpi-card">
          <div className="kpi-icon" style={{ background: 'linear-gradient(135deg, #E6A77B 0%, #F4D1B5 100%)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="kpi-content">
            <p className="kpi-label">Total Revenue</p>
            <p className="kpi-value">{formatCurrency(kpis.revenue.total)}</p>
            <p className="kpi-detail">Platform Fees: {formatCurrency(kpis.revenue.platformFees)}</p>
          </div>
        </div>

        <div className="analytics-kpi-card analytics-kpi-small">
          <p className="kpi-label-sm">Avg Booking Value</p>
          <p className="kpi-value-sm">{formatCurrency(kpis.revenue.average)}</p>
        </div>

        <div className="analytics-kpi-card analytics-kpi-small">
          <p className="kpi-label-sm">Available Mechanics</p>
          <p className="kpi-value-sm">{kpis.mechanics.available}</p>
        </div>

        <div className="analytics-kpi-card analytics-kpi-small">
          <p className="kpi-label-sm">Cancelled Bookings</p>
          <p className="kpi-value-sm">{kpis.bookings.cancelled}</p>
        </div>

        <div className="analytics-kpi-card analytics-kpi-small">
          <p className="kpi-label-sm">Customers w/ Bookings</p>
          <p className="kpi-value-sm">{kpis.customers.withBookings}</p>
        </div>
      </div>

      {/* Booking Trends Chart */}
      <div className="analytics-chart-section">
        <h2 className="analytics-section-title">Booking Trends</h2>
        <div className="analytics-chart-container">
          {charts.bookingsOverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={charts.bookingsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5DDD5" />
                <XAxis dataKey="date" stroke="#834417" />
                <YAxis stroke="#834417" />
                <Tooltip 
                  contentStyle={{ background: '#FFF8F3', border: '1px solid #834417', borderRadius: '4px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#834417" strokeWidth={2} name="Bookings" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="analytics-no-data">No booking data available</p>
          )}
        </div>
      </div>

      {/* Revenue Trends Chart */}
      <div className="analytics-chart-section">
        <h2 className="analytics-section-title">Revenue Trends</h2>
        <div className="analytics-chart-container">
          {charts.revenueOverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={charts.revenueOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5DDD5" />
                <XAxis dataKey="date" stroke="#834417" />
                <YAxis stroke="#834417" />
                <Tooltip 
                  contentStyle={{ background: '#FFF8F3', border: '1px solid #834417', borderRadius: '4px' }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#834417" strokeWidth={2} name="Total Revenue" />
                <Line type="monotone" dataKey="platformFees" stroke="#A85A2B" strokeWidth={2} name="Platform Fees" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="analytics-no-data">No revenue data available</p>
          )}
        </div>
      </div>

      {/* Two Column Charts */}
      <div className="analytics-two-column">
        {/* Booking Status Distribution */}
        <div className="analytics-chart-section">
          <h2 className="analytics-section-title">Booking Status</h2>
          <div className="analytics-chart-container">
            {charts.bookingStatus.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={charts.bookingStatus}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => `${entry.status}: ${entry.count}`}
                  >
                    {charts.bookingStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="analytics-no-data">No status data available</p>
            )}
          </div>
        </div>

        {/* Vehicle Type Distribution */}
        <div className="analytics-chart-section">
          <h2 className="analytics-section-title">Vehicle Types</h2>
          <div className="analytics-chart-container">
            {charts.vehicleTypes.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={charts.vehicleTypes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5DDD5" />
                  <XAxis dataKey="vehicleType" stroke="#834417" />
                  <YAxis stroke="#834417" />
                  <Tooltip 
                    contentStyle={{ background: '#FFF8F3', border: '1px solid #834417', borderRadius: '4px' }}
                  />
                  <Bar dataKey="count" fill="#834417" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="analytics-no-data">No vehicle data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Service Distribution */}
      {charts.services.length > 0 && (
        <div className="analytics-chart-section">
          <h2 className="analytics-section-title">Popular Services</h2>
          <div className="analytics-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={charts.services} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5DDD5" />
                <XAxis type="number" stroke="#834417" />
                <YAxis dataKey="service" type="category" stroke="#834417" width={150} />
                <Tooltip 
                  contentStyle={{ background: '#FFF8F3', border: '1px solid #834417', borderRadius: '4px' }}
                />
                <Bar dataKey="count" fill="#A85A2B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Booking Funnel */}
      <div className="analytics-funnel">
        <h2 className="analytics-section-title">Booking Funnel</h2>
        <div className="funnel-container">
          <div className="funnel-step" style={{ width: '100%' }}>
            <span className="funnel-label">Total Requests</span>
            <span className="funnel-value">{kpis.bookings.total}</span>
          </div>
          <div className="funnel-arrow">↓</div>
          <div className="funnel-step" style={{ width: '80%' }}>
            <span className="funnel-label">Accepted</span>
            <span className="funnel-value">{kpis.bookings.accepted}</span>
          </div>
          <div className="funnel-arrow">↓</div>
          <div className="funnel-step" style={{ width: '60%' }}>
            <span className="funnel-label">Completed</span>
            <span className="funnel-value">{kpis.bookings.completed}</span>
          </div>
          <div className="funnel-side-stats">
            <div className="funnel-side-item">
              <span className="funnel-side-label">Rejected:</span>
              <span className="funnel-side-value">{kpis.bookings.rejected}</span>
            </div>
            <div className="funnel-side-item">
              <span className="funnel-side-label">Cancelled:</span>
              <span className="funnel-side-value">{kpis.bookings.cancelled}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="analytics-activity">
        <h2 className="analytics-section-title">Recent Activity</h2>
        <div className="activity-grid">
          {/* Recent Bookings */}
          <div className="activity-section">
            <h3 className="activity-subtitle">Recent Bookings</h3>
            {recentActivity.bookings.length > 0 ? (
              <div className="activity-list">
                {recentActivity.bookings.map((booking) => (
                  <div key={booking.id} className="activity-item">
                    <div className="activity-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      </svg>
                    </div>
                    <div className="activity-content">
                      <p className="activity-title">
                        {booking.serviceType || 'Service'} - {booking.vehicleType}
                      </p>
                      <p className="activity-meta">
                        <span className={`status-badge status-${booking.status}`}>{booking.status}</span>
                        {timeAgo(booking.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="activity-empty">No recent bookings</p>
            )}
          </div>

          {/* Recent Mechanics */}
          <div className="activity-section">
            <h3 className="activity-subtitle">Recent Mechanics</h3>
            {recentActivity.mechanics.length > 0 ? (
              <div className="activity-list">
                {recentActivity.mechanics.map((mechanic) => (
                  <div key={mechanic.id} className="activity-item">
                    <div className="activity-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                      </svg>
                    </div>
                    <div className="activity-content">
                      <p className="activity-title">{mechanic.name}</p>
                      <p className="activity-meta">
                        <span className={`status-badge status-${mechanic.status}`}>{mechanic.status}</span>
                        {timeAgo(mechanic.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="activity-empty">No recent mechanics</p>
            )}
          </div>

          {/* Recent Customers */}
          <div className="activity-section">
            <h3 className="activity-subtitle">Recent Customers</h3>
            {recentActivity.customers.length > 0 ? (
              <div className="activity-list">
                {recentActivity.customers.map((customer) => (
                  <div key={customer.id} className="activity-item">
                    <div className="activity-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="activity-content">
                      <p className="activity-title">{customer.name}</p>
                      <p className="activity-meta">{timeAgo(customer.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="activity-empty">No recent customers</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
