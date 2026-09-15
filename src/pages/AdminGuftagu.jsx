import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './AdminGuftagu.css';

const AdminGuftagu = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const [activeTab, setActiveTab] = useState('chat');

  // Chat state
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [chatError, setChatError] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [profileImages, setProfileImages] = useState({}); // Store admin profile images
  const [loadingImages, setLoadingImages] = useState(new Set()); // Track which images are being loaded

  // Suggestions state
  const [suggestions, setSuggestions] = useState([]);
  const [showNewSuggestion, setShowNewSuggestion] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState({ title: '', description: '' });
  const [savingSuggestion, setSavingSuggestion] = useState(false);
  const [suggestionError, setSuggestionError] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [expandedSuggestion, setExpandedSuggestion] = useState(null);
  const [newComment, setNewComment] = useState('');

  const authConfig = () => ({
    headers: { Authorization: `Bearer ${token}` },
  });

  useEffect(() => {
    if (activeTab === 'chat') {
      fetchMessages();
    } else {
      fetchSuggestions();
    }
  }, [activeTab, filterStatus]);

  // Cleanup blob URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(profileImages).forEach(url => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  const fetchProfileImage = async (adminId) => {
    // Skip if already fetched/loading or no adminId
    if (!adminId || profileImages[adminId] || loadingImages.has(adminId)) return;

    // Mark as loading
    setLoadingImages(prev => new Set([...prev, adminId]));

    try {
      const response = await axios.get(`/admin/profile-picture/${adminId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(response.data);
      setProfileImages(prev => ({ ...prev, [adminId]: imageUrl }));
    } catch (err) {
      // Profile image is optional, silently fail
      console.log(`Profile image not available for admin ${adminId}`);
    } finally {
      // Remove from loading set
      setLoadingImages(prev => {
        const newSet = new Set([...prev]);
        newSet.delete(adminId);
        return newSet;
      });
    }
  };

  const fetchMessages = async () => {
    try {
      setChatLoading(true);
      setChatError('');
      console.log('🔍 Fetching messages from /admin/guftagu/messages');
      const response = await axios.get('/admin/guftagu/messages', authConfig());
      console.log('✅ Messages response:', response.data);
      setMessages(response.data.messages || []);
      
      // Fetch profile images for all admins in messages
      const adminIds = new Set();
      response.data.messages?.forEach(msg => {
        if (msg.sender?._id && msg.sender?.profileImage) {
          adminIds.add(msg.sender._id);
        }
        if (msg.receiver?._id && msg.receiver?.profileImage) {
          adminIds.add(msg.receiver._id);
        }
      });
      
      // Fetch all profile images
      adminIds.forEach(adminId => fetchProfileImage(adminId));
    } catch (err) {
      console.error('❌ Failed to fetch messages:', err);
      console.error('Response:', err.response);
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        navigate('/admin/login');
      } else {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to load messages';
        console.error('Error message:', errorMessage);
        setChatError(errorMessage);
      }
    } finally {
      setChatLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sendingMessage) return;

    setSendingMessage(true);
    setChatError('');

    try {
      const response = await axios.post('/admin/guftagu/messages', {
        message: newMessage
      }, authConfig());

      setMessages(prev => [...prev, response.data.data]);
      setNewMessage('');
    } catch (err) {
      setChatError(err.response?.data?.message || 'Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const fetchSuggestions = async () => {
    try {
      setSuggestionError('');
      const params = filterStatus ? `?status=${filterStatus}` : '';
      const response = await axios.get(`/admin/guftagu/suggestions${params}`, authConfig());
      setSuggestions(response.data.suggestions);
      
      // Fetch profile images for all admins in suggestions
      const adminIds = new Set();
      response.data.suggestions?.forEach(suggestion => {
        if (suggestion.createdBy?._id && suggestion.createdBy?.profileImage) {
          adminIds.add(suggestion.createdBy._id);
        }
        suggestion.comments?.forEach(comment => {
          if (comment.author?._id && comment.author?.profileImage) {
            adminIds.add(comment.author._id);
          }
        });
      });
      
      // Fetch all profile images
      adminIds.forEach(adminId => fetchProfileImage(adminId));
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminEmail');
        navigate('/admin/login');
      } else {
        setSuggestionError(err.response?.data?.message || 'Failed to load suggestions');
      }
    }
  };

  const createSuggestion = async (e) => {
    e.preventDefault();
    if (!newSuggestion.title.trim() || !newSuggestion.description.trim() || savingSuggestion) return;

    setSavingSuggestion(true);
    setSuggestionError('');

    try {
      await axios.post('/admin/guftagu/suggestions', newSuggestion, authConfig());
      setNewSuggestion({ title: '', description: '' });
      setShowNewSuggestion(false);
      fetchSuggestions();
    } catch (err) {
      setSuggestionError(err.response?.data?.message || 'Failed to create suggestion');
    } finally {
      setSavingSuggestion(false);
    }
  };

  const updateSuggestionStatus = async (id, status) => {
    try {
      await axios.patch(`/admin/guftagu/suggestions/${id}`, { status }, authConfig());
      fetchSuggestions();
    } catch (err) {
      setSuggestionError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const deleteSuggestion = async (id) => {
    if (!confirm('Are you sure you want to delete this suggestion?')) return;

    try {
      await axios.delete(`/admin/guftagu/suggestions/${id}`, authConfig());
      fetchSuggestions();
    } catch (err) {
      setSuggestionError(err.response?.data?.message || 'Failed to delete suggestion');
    }
  };

  const addComment = async (suggestionId) => {
    if (!newComment.trim()) return;

    try {
      await axios.post(`/admin/guftagu/suggestions/${suggestionId}/comments`, {
        text: newComment
      }, authConfig());
      setNewComment('');
      fetchSuggestions();
    } catch (err) {
      setSuggestionError(err.response?.data?.message || 'Failed to add comment');
    }
  };

  const getAvatar = (admin) => {
    if (!admin) return <div className="guftagu-avatar-fallback">?</div>;
    
    // Check if we have loaded this admin's profile image
    if (admin._id && profileImages[admin._id]) {
      return (
        <img 
          src={profileImages[admin._id]} 
          alt={admin.name} 
          className="guftagu-avatar-img"
        />
      );
    }
    
    // Fallback to initials
    return (
      <div className="guftagu-avatar-fallback">
        {admin.name?.charAt(0).toUpperCase() || '?'}
      </div>
    );
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'new': 'guftagu-status-new',
      'under_review': 'guftagu-status-review',
      'planned': 'guftagu-status-planned',
      'in_progress': 'guftagu-status-progress',
      'completed': 'guftagu-status-completed',
      'rejected': 'guftagu-status-rejected'
    };
    return statusMap[status] || 'guftagu-status-new';
  };

  const getStatusLabel = (status) => {
    const labelMap = {
      'new': 'New',
      'under_review': 'Under Review',
      'planned': 'Planned',
      'in_progress': 'In Progress',
      'completed': 'Completed',
      'rejected': 'Rejected'
    };
    return labelMap[status] || status;
  };

  return (
    <div className="admin-guftagu-page">
      <header className="guftagu-header">
        <div>
          <h1 className="guftagu-title">GUFTAGU</h1>
          <p className="guftagu-subtitle">Internal communication & ideas for making Mechze better.</p>
        </div>
      </header>

      <div className="guftagu-tabs">
        <button
          className={`guftagu-tab ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          💬 Chat
        </button>
        <button
          className={`guftagu-tab ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          💡 Suggestions / Ideas
        </button>
      </div>

      {activeTab === 'chat' ? (
        <div className="guftagu-chat-container">
          {chatError && <div className="guftagu-error">{chatError}</div>}
          
          {chatLoading ? (
            <div className="guftagu-loading">
              <div className="guftagu-spinner" />
              <p>Loading messages...</p>
            </div>
          ) : (
            <>
              <div className="guftagu-messages">
                {messages.length === 0 ? (
                  <div className="guftagu-empty">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg._id} className="guftagu-message">
                      <div className="guftagu-message-header">
                        <div className="guftagu-message-sender">
                          {getAvatar(msg.sender)}
                          <strong>{msg.sender?.name || 'Admin'}</strong>
                        </div>
                        <span className="guftagu-message-time">{formatDateTime(msg.createdAt)}</span>
                      </div>
                      <div className="guftagu-message-body">{msg.message}</div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={sendMessage} className="guftagu-message-form">
                <input
                  type="text"
                  className="guftagu-message-input"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={sendingMessage}
                />
                <button
                  type="submit"
                  className="guftagu-send-btn"
                  disabled={sendingMessage || !newMessage.trim()}
                >
                  {sendingMessage ? 'Sending...' : 'Send'}
                </button>
              </form>
            </>
          )}
        </div>
      ) : (
        <div className="guftagu-suggestions-container">
          {suggestionError && <div className="guftagu-error">{suggestionError}</div>}
          
          <div className="guftagu-suggestions-header">
            <button
              className="guftagu-new-btn"
              onClick={() => setShowNewSuggestion(!showNewSuggestion)}
            >
              {showNewSuggestion ? 'Cancel' : '+ New Idea'}
            </button>
            
            <select
              className="guftagu-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="under_review">Under Review</option>
              <option value="planned">Planned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {showNewSuggestion && (
            <form onSubmit={createSuggestion} className="guftagu-new-suggestion-form">
              <input
                type="text"
                className="guftagu-input"
                placeholder="Idea title..."
                value={newSuggestion.title}
                onChange={(e) => setNewSuggestion(prev => ({ ...prev, title: e.target.value }))}
                required
                maxLength={200}
              />
              <textarea
                className="guftagu-textarea"
                placeholder="Describe your idea..."
                value={newSuggestion.description}
                onChange={(e) => setNewSuggestion(prev => ({ ...prev, description: e.target.value }))}
                required
                maxLength={5000}
                rows={4}
              />
              <button
                type="submit"
                className="guftagu-save-btn"
                disabled={savingSuggestion}
              >
                {savingSuggestion ? 'Creating...' : 'Create Idea'}
              </button>
            </form>
          )}

          <div className="guftagu-suggestions-list">
            {suggestions.length === 0 ? (
              <div className="guftagu-empty">
                <p>No suggestions yet. Be the first to share an idea!</p>
              </div>
            ) : (
              suggestions.map((suggestion) => (
                <div key={suggestion._id} className="guftagu-suggestion-card">
                  <div className="guftagu-suggestion-header">
                    <h3>{suggestion.title}</h3>
                    <span className={`guftagu-status-badge ${getStatusBadgeClass(suggestion.status)}`}>
                      {getStatusLabel(suggestion.status)}
                    </span>
                  </div>
                  
                  <p className="guftagu-suggestion-description">{suggestion.description}</p>
                  
                  <div className="guftagu-suggestion-meta">
                    <span className="guftagu-suggestion-author">
                      {getAvatar(suggestion.createdBy)}
                      <span>By {suggestion.createdBy?.name || 'Admin'}</span>
                    </span>
                    <span>{formatDateTime(suggestion.createdAt)}</span>
                  </div>

                  <div className="guftagu-suggestion-actions">
                    <select
                      value={suggestion.status}
                      onChange={(e) => updateSuggestionStatus(suggestion._id, e.target.value)}
                      className="guftagu-status-select"
                    >
                      <option value="new">New</option>
                      <option value="under_review">Under Review</option>
                      <option value="planned">Planned</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    
                    <button
                      className="guftagu-expand-btn"
                      onClick={() => setExpandedSuggestion(
                        expandedSuggestion === suggestion._id ? null : suggestion._id
                      )}
                    >
                      {expandedSuggestion === suggestion._id ? 'Hide' : 'Comments'} ({suggestion.comments?.length || 0})
                    </button>
                    
                    <button
                      className="guftagu-delete-btn"
                      onClick={() => deleteSuggestion(suggestion._id)}
                    >
                      Delete
                    </button>
                  </div>

                  {expandedSuggestion === suggestion._id && (
                    <div className="guftagu-comments-section">
                      <div className="guftagu-comments-list">
                        {suggestion.comments && suggestion.comments.length > 0 ? (
                          suggestion.comments.map((comment, index) => (
                            <div key={index} className="guftagu-comment">
                              <div className="guftagu-comment-header">
                                {getAvatar(comment.author)}
                                <strong>{comment.author?.name || 'Admin'}</strong>
                              </div>
                              <p>{comment.text}</p>
                              <span className="guftagu-comment-time">{formatDateTime(comment.createdAt)}</span>
                            </div>
                          ))
                        ) : (
                          <p className="guftagu-no-comments">No comments yet.</p>
                        )}
                      </div>
                      
                      <div className="guftagu-comment-form">
                        <input
                          type="text"
                          className="guftagu-comment-input"
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addComment(suggestion._id);
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="guftagu-comment-btn"
                          onClick={() => addComment(suggestion._id)}
                          disabled={!newComment.trim()}
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGuftagu;
