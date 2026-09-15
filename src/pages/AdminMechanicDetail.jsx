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
  const [documents, setDocuments] = useState([]);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [documentsError, setDocumentsError] = useState('');
  const [statusUpdating, setStatusUpdating] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);

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
        
        // Fetch documents if mechanic has documents
        if (response.data.mechanic && response.data.mechanic.documents && response.data.mechanic.documents.length > 0) {
          fetchDocuments();
        } else {
          setDocuments([]); // Clear any existing documents
        }
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

  const fetchDocuments = async () => {
    try {
      setDocumentsLoading(true);
      setDocumentsError('');
      const response = await axios.get(`/admin/mechanics/${id}/documents`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocuments(response.data.documents || []);
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Failed to load documents';
      if (status === 401 || status === 403) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        navigate('/admin/login');
      } else {
        setDocumentsError(message);
      }
    } finally {
      setDocumentsLoading(false);
    }
  };

  const viewDocument = async (documentId, filename) => {
    try {
      const response = await axios.get(`/admin/mechanics/${id}/documents/${documentId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // Important for binary data
      });
      
      // Create blob URL and open in new tab
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Set filename for download if needed
      link.download = filename || `document-${documentId}`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error viewing document:', err);
      const message = err.response?.data?.message || 'Failed to load document';
      setDocumentsError(message);
    }
  };

  const updateDocumentStatus = async (documentId, newStatus) => {
    try {
      setStatusUpdating(prev => ({ ...prev, [documentId]: true }));
      setDocumentsError('');

      const response = await axios.patch(`/admin/mechanics/${id}/documents/${documentId}/status`, {
        status: newStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Refresh documents list
      await fetchDocuments();
      
      // Show success message temporarily
      const successMessage = `Document ${newStatus} successfully`;
      setDocumentsError(''); // Clear any existing errors
      
      // You could add a success state here if needed
      console.log(successMessage);
      
    } catch (err) {
      console.error('Error updating document status:', err);
      const message = err.response?.data?.message || `Failed to ${newStatus.toLowerCase()} document`;
      setDocumentsError(message);
    } finally {
      setStatusUpdating(prev => ({ ...prev, [documentId]: false }));
      setShowConfirmDialog(null);
    }
  };

  const handleStatusChange = (documentId, newStatus, filename) => {
    setShowConfirmDialog({
      documentId,
      newStatus,
      filename,
      message: `Are you sure you want to ${newStatus.toLowerCase()} the document "${filename}"?`
    });
  };

  const confirmStatusChange = () => {
    if (showConfirmDialog) {
      updateDocumentStatus(showConfirmDialog.documentId, showConfirmDialog.newStatus);
    }
  };

  const cancelStatusChange = () => {
    setShowConfirmDialog(null);
  };

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

      {/* Documents Section */}
      <section className="mechanic-detail-section">
        <h2>Documents</h2>
        {documentsLoading ? (
          <div className="mechanic-detail-loading-small">
            <div className="mechanic-detail-spinner-small" />
            <span>Loading documents...</span>
          </div>
        ) : documentsError ? (
          <div className="mechanic-detail-error-small">
            {documentsError}
            <button 
              type="button" 
              className="mechanic-detail-retry-btn" 
              onClick={fetchDocuments}
            >
              Retry
            </button>
          </div>
        ) : !mechanic.documents || mechanic.documents.length === 0 ? (
          <p className="mechanic-detail-empty">No documents uploaded by this mechanic.</p>
        ) : (
          <div className="mechanic-detail-documents-wrapper">
            <table className="mechanic-detail-documents">
              <thead>
                <tr>
                  <th>Filename</th>
                  <th>Type</th>
                  <th>Document Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td className="mechanic-detail-document-name">
                      <span className="mechanic-detail-document-icon">
                        {doc.mimeType?.startsWith('image/') ? '🖼️' : 
                         doc.mimeType === 'application/pdf' ? '📄' : '📎'}
                      </span>
                      {doc.filename}
                    </td>
                    <td>{doc.fileExtension?.toUpperCase() || 'Unknown'}</td>
                    <td className="mechanic-detail-document-type">
                      {doc.type ? doc.type.charAt(0).toUpperCase() + doc.type.slice(1) : 'Unknown'}
                    </td>
                    <td>
                      <span className={`mechanic-detail-doc-status mechanic-detail-doc-status-${doc.status}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="mechanic-detail-document-actions">
                      <button
                        type="button"
                        className="mechanic-detail-view-btn"
                        onClick={() => viewDocument(doc.documentId, doc.filename)}
                        title="View document"
                        disabled={statusUpdating[doc.documentId]}
                      >
                        View
                      </button>
                      {doc.status !== 'verified' && (
                        <button
                          type="button"
                          className="mechanic-detail-verify-btn"
                          onClick={() => handleStatusChange(doc.documentId, 'verified', doc.filename)}
                          disabled={statusUpdating[doc.documentId]}
                          title="Verify document"
                        >
                          {statusUpdating[doc.documentId] ? '...' : 'Verify'}
                        </button>
                      )}
                      {doc.status !== 'rejected' && (
                        <button
                          type="button"
                          className="mechanic-detail-reject-btn"
                          onClick={() => handleStatusChange(doc.documentId, 'rejected', doc.filename)}
                          disabled={statusUpdating[doc.documentId]}
                          title="Reject document"
                        >
                          {statusUpdating[doc.documentId] ? '...' : 'Reject'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="mechanic-detail-modal-overlay">
          <div className="mechanic-detail-confirmation-dialog">
            <h3>Confirm Action</h3>
            <p>{showConfirmDialog.message}</p>
            <div className="mechanic-detail-dialog-actions">
              <button
                type="button"
                className="mechanic-detail-cancel-btn"
                onClick={cancelStatusChange}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`mechanic-detail-confirm-btn mechanic-detail-confirm-${showConfirmDialog.newStatus}`}
                onClick={confirmStatusChange}
              >
                {showConfirmDialog.newStatus === 'verified' ? 'Verify' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}

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
