import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const decodeEmailFromToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return '';
    const payload = JSON.parse(atob(parts[1]));
    return payload.email || payload.adminEmail || '';
  } catch (err) {
    return '';
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken') || '';
  const storedEmail = localStorage.getItem('adminEmail') || '';
  const decodedEmail = token ? decodeEmailFromToken(token) : '';
  const emailToShow = storedEmail || decodedEmail || 'Not available';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState({
    totalMechanics: 0,
    totalCustomers: 0,
    mechanicsThisWeek: 0,
    customersThisWeek: 0,
    latestMechanics: [],
    latestCustomers: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await axios.get('/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSummary(res.data);
      } catch (err) {
        const status = err.response?.status;
        const message = err.response?.data?.message || 'Failed to fetch dashboard data';

        if (status === 401 || status === 403) {
          // Unauthorized or Forbidden - logout and redirect
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

    fetchDashboardData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div style={{
        backgroundColor: '#F7F8FA',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        fontFamily: "'Arial', sans-serif",
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '500px',
          textAlign: 'center',
        }}>
          <p style={{ color: '#2D2D2D', fontSize: '1.1rem' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#F7F8FA',
      minHeight: '100vh',
      padding: '2rem 1rem',
      fontFamily: "'Arial', sans-serif",
    }}>
      <div style={{
        maxWidth: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}>
          <div>
            <h1 style={{
              color: '#1E2A78',
              fontSize: '2rem',
              fontWeight: '700',
              margin: '0 0 0.5rem 0',
            }}>
              Welcome Admin
            </h1>
            <p style={{
              color: '#2D2D2D',
              fontSize: '1rem',
              margin: '0',
            }}>
              Email: {emailToShow}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#FF6B35',
              color: '#F7F8FA',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#FFE5E5',
            border: '1px solid #FF6B35',
            color: '#FF6B35',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            textAlign: 'center',
          }}>
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <p style={{
              color: '#2D2D2D',
              fontSize: '0.9rem',
              margin: '0 0 0.5rem 0',
              fontWeight: '600',
            }}>
              Total Mechanics
            </p>
            <p style={{
              color: '#FF6B35',
              fontSize: '2rem',
              fontWeight: '700',
              margin: '0',
            }}>
              {summary.totalMechanics}
            </p>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <p style={{
              color: '#2D2D2D',
              fontSize: '0.9rem',
              margin: '0 0 0.5rem 0',
              fontWeight: '600',
            }}>
              Total Customers
            </p>
            <p style={{
              color: '#FF6B35',
              fontSize: '2rem',
              fontWeight: '700',
              margin: '0',
            }}>
              {summary.totalCustomers}
            </p>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <p style={{
              color: '#2D2D2D',
              fontSize: '0.9rem',
              margin: '0 0 0.5rem 0',
              fontWeight: '600',
            }}>
              Mechanics This Week
            </p>
            <p style={{
              color: '#FF6B35',
              fontSize: '2rem',
              fontWeight: '700',
              margin: '0',
            }}>
              {summary.mechanicsThisWeek}
            </p>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <p style={{
              color: '#2D2D2D',
              fontSize: '0.9rem',
              margin: '0 0 0.5rem 0',
              fontWeight: '600',
            }}>
              Customers This Week
            </p>
            <p style={{
              color: '#FF6B35',
              fontSize: '2rem',
              fontWeight: '700',
              margin: '0',
            }}>
              {summary.customersThisWeek}
            </p>
          </div>
        </div>

        {/* Latest Mechanics */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
        }}>
          <h3 style={{
            color: '#1E2A78',
            fontSize: '1.3rem',
            fontWeight: '600',
            margin: '0 0 1rem 0',
          }}>
            Top Mechanics (Latest 5)
          </h3>
          {summary.latestMechanics.length > 0 ? (
            <div style={{
              overflowX: 'auto',
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #F7F8FA' }}>
                    <th style={{
                      textAlign: 'left',
                      padding: '0.75rem',
                      color: '#2D2D2D',
                      fontWeight: '600',
                    }}>
                      Name
                    </th>
                    <th style={{
                      textAlign: 'left',
                      padding: '0.75rem',
                      color: '#2D2D2D',
                      fontWeight: '600',
                    }}>
                      Email
                    </th>
                    <th style={{
                      textAlign: 'left',
                      padding: '0.75rem',
                      color: '#2D2D2D',
                      fontWeight: '600',
                    }}>
                      Phone
                    </th>
                    <th style={{
                      textAlign: 'left',
                      padding: '0.75rem',
                      color: '#2D2D2D',
                      fontWeight: '600',
                    }}>
                      Experience
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {summary.latestMechanics.map((mechanic, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F7F8FA' }}>
                      <td style={{
                        padding: '0.75rem',
                        color: '#2D2D2D',
                      }}>
                        {mechanic.name}
                      </td>
                      <td style={{
                        padding: '0.75rem',
                        color: '#2D2D2D',
                      }}>
                        {mechanic.email}
                      </td>
                      <td style={{
                        padding: '0.75rem',
                        color: '#2D2D2D',
                      }}>
                        {mechanic.phone}
                      </td>
                      <td style={{
                        padding: '0.75rem',
                        color: '#2D2D2D',
                      }}>
                        {mechanic.experienceYears} yrs
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#2D2D2D', textAlign: 'center' }}>No mechanics yet.</p>
          )}
        </div>

        {/* Recent Customers */}
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <h3 style={{
            color: '#1E2A78',
            fontSize: '1.3rem',
            fontWeight: '600',
            margin: '0 0 1rem 0',
          }}>
            Recent Customers (Latest 5)
          </h3>
          {summary.latestCustomers.length > 0 ? (
            <div style={{
              overflowX: 'auto',
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #F7F8FA' }}>
                    <th style={{
                      textAlign: 'left',
                      padding: '0.75rem',
                      color: '#2D2D2D',
                      fontWeight: '600',
                    }}>
                      Name
                    </th>
                    <th style={{
                      textAlign: 'left',
                      padding: '0.75rem',
                      color: '#2D2D2D',
                      fontWeight: '600',
                    }}>
                      Email
                    </th>
                    <th style={{
                      textAlign: 'left',
                      padding: '0.75rem',
                      color: '#2D2D2D',
                      fontWeight: '600',
                    }}>
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {summary.latestCustomers.map((customer, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F7F8FA' }}>
                      <td style={{
                        padding: '0.75rem',
                        color: '#2D2D2D',
                      }}>
                        {customer.name}
                      </td>
                      <td style={{
                        padding: '0.75rem',
                        color: '#2D2D2D',
                      }}>
                        {customer.email}
                      </td>
                      <td style={{
                        padding: '0.75rem',
                        color: '#2D2D2D',
                      }}>
                        {customer.phone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: '#2D2D2D', textAlign: 'center' }}>No customers yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
