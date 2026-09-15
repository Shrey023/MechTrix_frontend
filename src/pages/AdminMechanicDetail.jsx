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
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

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
      
      // Get content type from response headers
      const contentType = response.headers['content-type'] || 'application/octet-stream';
      
      // Check if response is actually JSON error (server error with blob responseType)
      if (contentType.includes('application/json')) {
        // Response is JSON error, not a file
        const text = await response.data.text();
        const errorData = JSON.parse(text);
        setDocumentsError(errorData.message || 'Failed to load document');
        return;
      }
      
      // Create blob with proper content type
      const blob = new Blob([response.data], { type: contentType });
      const url = window.URL.createObjectURL(blob);
      
      // Open in new tab/window for viewing
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      // If popup was blocked, provide fallback download
      if (!newWindow) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || `document-${documentId}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      // Clean up the blob URL after a delay (to allow the new window to load)
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (err) {
      console.error('Error viewing document:', err);
      
      // Try to extract error message from blob response
      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const errorData = JSON.parse(text);
          setDocumentsError(errorData.message || 'Failed to load document');
          return;
        } catch (parseErr) {
          // If parsing fails, use generic message
        }
      }
      
      const message = err.response?.data?.message || err.message || 'Failed to load document';
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
      
      // Refresh mechanic details to get updated verification status
      await fetchMechanic();
      
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

  const startEdit = () => {
    setEditData({
      name: mechanic.name || '',
      email: mechanic.email || '',
      phone: mechanic.phone || '',
      experienceYears: mechanic.experienceYears || 0,
      serviceRadius: mechanic.serviceRadius || 5,
      vehicleTypes: mechanic.vehicleTypes || [],
      servicesOffered: mechanic.servicesOffered || [],
      isVerified: mechanic.isVerified || false,
      verificationStatus: mechanic.verificationStatus || 'pending',
      currentStatus: mechanic.currentStatus || 'offline',
      // Pricing fields if they exist
      baseVisitingCharge: mechanic.pricing?.baseVisitingCharge || 100,
      includedDistanceKm: mechanic.pricing?.includedDistanceKm || 5,
      extraChargePerKm: mechanic.pricing?.extraChargePerKm || 10
    });
    setIsEditing(true);
    setEditError('');
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditData({});
    setEditError('');
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, value) => {
    // Convert comma-separated string to array
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
    setEditData(prev => ({ ...prev, [field]: arrayValue }));
  };

  const saveEdit = async () => {
    try {
      setEditLoading(true);
      setEditError('');

      // Prepare the data to match the backend expectations
      const updateData = {
        name: editData.name,
        email: editData.email,
        phone: editData.phone,
        experienceYears: Number(editData.experienceYears),
        serviceRadius: Number(editData.serviceRadius),
        vehicleTypes: editData.vehicleTypes,
        servicesOffered: editData.servicesOffered,
        isVerified: editData.isVerified,
        verificationStatus: editData.verificationStatus,
        currentStatus: editData.currentStatus,
        // Include pricing as nested object
        pricing: {
          baseVisitingCharge: Number(editData.baseVisitingCharge),
          includedDistanceKm: Number(editData.includedDistanceKm),
          extraChargePerKm: Number(editData.extraChargePerKm)
        }
      };

      const response = await axios.patch(`/admin/mechanics/${id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update the mechanic data with the response
      setMechanic(response.data.mechanic);
      setIsEditing(false);
      setEditData({});
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update mechanic';
      setEditError(message);
    } finally {
      setEditLoading(false);
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
        <div className="mechanic-detail-actions">
          <button
            className="mechanic-detail-edit-btn"
            onClick={startEdit}
            disabled={isEditing}
          >
            Edit Mechanic
          </button>
        </div>
      </section>

      <section className="mechanic-detail-section">
        <h2>Profile Information</h2>
        
        {editError && (
          <div className="mechanic-detail-edit-error">
            {editError}
          </div>
        )}

        {isEditing ? (
          <div className="mechanic-detail-edit-form">
            <div className="mechanic-detail-edit-grid">
              <div className="mechanic-detail-edit-field">
                <label className="mechanic-detail-edit-label">Name</label>
                <input
                  type="text"
                  className="mechanic-detail-edit-input"
                  value={editData.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  placeholder="Enter mechanic name"
                />
              </div>

              <div className="mechanic-detail-edit-field">
                <label className="mechanic-detail-edit-label">Email</label>
                <input
                  type="email"
                  className="mechanic-detail-edit-input"
                  value={editData.email}
                  onChange={(e) => handleEditChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>

              <div className="mechanic-detail-edit-field">
                <label className="mechanic-detail-edit-label">Phone</label>
                <input
                  type="tel"
                  className="mechanic-detail-edit-input"
                  value={editData.phone}
                  onChange={(e) => handleEditChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="mechanic-detail-edit-field">
                <label className="mechanic-detail-edit-label">Experience (Years)</label>
                <input
                  type="number"
                  className="mechanic-detail-edit-input"
                  value={editData.experienceYears}
                  onChange={(e) => handleEditChange('experienceYears', e.target.value)}
                  placeholder="Years of experience"
                  min="0"
                />
              </div>

              <div className="mechanic-detail-edit-field">
                <label className="mechanic-detail-edit-label">Service Radius (km)</label>
                <input
                  type="number"
                  className="mechanic-detail-edit-input"
                  value={editData.serviceRadius}
                  onChange={(e) => handleEditChange('serviceRadius', e.target.value)}
                  placeholder="Service radius in km"
                  min="1"
                />
              </div>

              <div className="mechanic-detail-edit-field">
                <label className="mechanic-detail-edit-label">Verification Status</label>
                <select
                  className="mechanic-detail-edit-input"
                  value={editData.verificationStatus}
                  onChange={(e) => handleEditChange('verificationStatus', e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="mechanic-detail-edit-field">
                <label className="mechanic-detail-edit-label">Current Status</label>
                <select
                  className="mechanic-detail-edit-input"
                  value={editData.currentStatus}
                  onChange={(e) => handleEditChange('currentStatus', e.target.value)}
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              <div className="mechanic-detail-edit-field">
                <label className="mechanic-detail-edit-label">Verified</label>
                <select
                  className="mechanic-detail-edit-input"
                  value={editData.isVerified}
                  onChange={(e) => handleEditChange('isVerified', e.target.value === 'true')}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <div className="mechanic-detail-edit-field mechanic-detail-edit-field-full">
                <label className="mechanic-detail-edit-label">Vehicle Types (comma separated)</label>
                <input
                  type="text"
                  className="mechanic-detail-edit-input"
                  value={editData.vehicleTypes?.join(', ') || ''}
                  onChange={(e) => handleArrayChange('vehicleTypes', e.target.value)}
                  placeholder="e.g. bike, car, truck"
                />
              </div>

              <div className="mechanic-detail-edit-field mechanic-detail-edit-field-full">
                <label className="mechanic-detail-edit-label">Services Offered (comma separated)</label>
                <input
                  type="text"
                  className="mechanic-detail-edit-input"
                  value={editData.servicesOffered?.join(', ') || ''}
                  onChange={(e) => handleArrayChange('servicesOffered', e.target.value)}
                  placeholder="e.g. towing, puncture repair, battery replacement"
                />
              </div>

              {/* Pricing Section */}
              <div className="mechanic-detail-edit-field">
                <label className="mechanic-detail-edit-label">Base Visiting Charge (₹)</label>
                <input
                  type="number"
                  className="mechanic-detail-edit-input"
                  value={editData.baseVisitingCharge}
                  onChange={(e) => handleEditChange('baseVisitingCharge', e.target.value)}
                  placeholder="Base charge"
                  min="50"
                  max="5000"
                />
              </div>

              <div className="mechanic-detail-edit-field">
                <label className="mechanic-detail-edit-label">Included Distance (km)</label>
                <input
                  type="number"
                  className="mechanic-detail-edit-input"
                  value={editData.includedDistanceKm}
                  onChange={(e) => handleEditChange('includedDistanceKm', e.target.value)}
                  placeholder="Included distance"
                  min="0"
                  max="100"
                />
              </div>

              <div className="mechanic-detail-edit-field">
                <label className="mechanic-detail-edit-label">Extra Charge per km (₹)</label>
                <input
                  type="number"
                  className="mechanic-detail-edit-input"
                  value={editData.extraChargePerKm}
                  onChange={(e) => handleEditChange('extraChargePerKm', e.target.value)}
                  placeholder="Extra charge per km"
                  min="5"
                  max="500"
                />
              </div>
            </div>

            <div className="mechanic-detail-edit-actions">
              <button
                type="button"
                className="mechanic-detail-edit-cancel-btn"
                onClick={cancelEdit}
                disabled={editLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="mechanic-detail-edit-save-btn"
                onClick={saveEdit}
                disabled={editLoading}
              >
                {editLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        ) : (
          <div className="mechanic-detail-grid">
            <div><span>Email</span><strong>{mechanic.email || 'Not provided'}</strong></div>
            <div><span>Phone</span><strong>{mechanic.phone || 'Not provided'}</strong></div>
            <div><span>Experience</span><strong>{mechanic.experienceYears ?? 0} years</strong></div>
            <div><span>Service Radius</span><strong>{mechanic.serviceRadius ?? 0} km</strong></div>
            <div><span>Vehicles</span><strong>{mechanic.vehicleTypes?.join(', ') || 'Not provided'}</strong></div>
            <div><span>Services</span><strong>{mechanic.servicesOffered?.join(', ') || 'Not provided'}</strong></div>
            <div><span>Verified Flag</span><strong>{mechanic.isVerified ? 'Yes' : 'No'}</strong></div>
            <div><span>Registered</span><strong>{formatDate(mechanic.createdAt)}</strong></div>
            {mechanic.pricing && (
              <>
                <div><span>Base Charge</span><strong>₹{mechanic.pricing.baseVisitingCharge}</strong></div>
                <div><span>Included Distance</span><strong>{mechanic.pricing.includedDistanceKm} km</strong></div>
                <div><span>Extra Charge/km</span><strong>₹{mechanic.pricing.extraChargePerKm}</strong></div>
              </>
            )}
          </div>
        )}
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
                  <tr 
                    key={booking._id}
                    onClick={() => navigate(`/admin/bookings/${booking._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
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
