import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleMap, MarkerF, PolylineF, useJsApiLoader } from '@react-google-maps/api';
import { io } from 'socket.io-client';
import axios from '../api/axios';
import './MechanicTracker.css';

// NOTE: containerStyle is now handled by CSS (.tracker-map-container) —
// the object is kept only to satisfy the GoogleMap mapContainerStyle prop requirement.
// Height is overridden by CSS; width: '100%' is harmless.
const containerStyle = {
  width: '100%',
  height: '100%',
};

const MechanicTracker = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [mechanicId, setMechanicId] = useState(null);
  const [mechanicName, setMechanicName] = useState('');
  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [eta, setEta] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // Fetch booking details with authentication
  useEffect(() => {
    const getBookingDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to track your booking');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`/tracking/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Backend returns validated data with ownership check
        if (!res.data.mechanic) {
          setError('No mechanic assigned to this booking yet');
          setLoading(false);
          return;
        }

        setMechanicId(res.data.mechanic.id);
        setMechanicName(res.data.mechanic.name);

        // Set mechanic location if available
        if (res.data.mechanic.location?.coordinates) {
          const [lng, lat] = res.data.mechanic.location.coordinates;
          setMechanicLocation({ lat, lng });
        }

        // Get customer location with error handling
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setCustomerLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
              });
            },
            (error) => {
              console.error('Geolocation error:', error);
              setError('Unable to access your location. Please enable location permissions.');
            },
            { timeout: 10000, enableHighAccuracy: true }
          );
        } else {
          setError('Geolocation is not supported by your browser');
        }

        setLoading(false);
      } catch (err) {
        console.error('❌ Failed to fetch booking:', err);
        if (err.response?.status === 401) {
          setError('Please log in to track your booking');
          setTimeout(() => navigate('/login'), 2000);
        } else if (err.response?.status === 403) {
          setError('You are not authorized to track this booking');
        } else if (err.response?.status === 400) {
          setError(err.response.data.message || 'Tracking not available for this booking');
        } else {
          setError('Failed to load tracking information');
        }
        setLoading(false);
      }
    };

    getBookingDetails();
  }, [bookingId, navigate]);

  // Socket.IO connection — authenticated and joined to per-booking room
  useEffect(() => {
    if (!mechanicId) return;

    const token = localStorage.getItem('token');

    const socketInstance = io(import.meta.env.VITE_BACKEND_URL, {
      auth: { token },          // JWT sent in handshake, not query string
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Emit joinTracking on every connect (covers initial connect + reconnects).
    // Server verifies ownership + status; ack carries { ok, error }.
    const joinRoom = () => {
      socketInstance.emit('joinTracking', { bookingId }, (ack) => {
        if (!ack || !ack.ok) {
          const reason = ack?.error || 'Unable to join tracking room';
          console.error('joinTracking rejected:', reason);
          setError(reason);
          socketInstance.disconnect();
        }
      });
    };

    socketInstance.on('connect', () => {
      console.log('✅ Socket connected');
      setSocketConnected(true);
      joinRoom();
    });

    socketInstance.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err.message);
      setSocketConnected(false);
    });

    socketInstance.on('disconnect', () => {
      console.log('🔌 Socket disconnected');
      setSocketConnected(false);
    });

    // Defence-in-depth mechanicId check: server already filters by room,
    // but guard here in case of unexpected cross-room leakage.
    socketInstance.on('locationUpdate', ({ mechanicId: incomingId, coordinates }) => {
      if (incomingId === mechanicId) {
        setMechanicLocation({
          lat: coordinates[1],
          lng: coordinates[0],
        });
      }
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [mechanicId, bookingId]);

  // Calculate ETA and distance
  useEffect(() => {
    if (!mechanicLocation || !customerLocation || !isLoaded) return;

    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin: mechanicLocation,
        destination: customerLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          const leg = result.routes[0].legs[0];
          setEta(leg.duration.text);
          setDistance(leg.distance.text);
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  }, [mechanicLocation, customerLocation, isLoaded]);

  const path = mechanicLocation && customerLocation
    ? [mechanicLocation, customerLocation]
    : [];

  const vanIcon = {
    url: 'https://cdn-icons-png.flaticon.com/512/296/296216.png',
    scaledSize: isLoaded ? new window.google.maps.Size(40, 40) : { width: 40, height: 40 },
  };

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading || !isLoaded) {
    return (
      <div className="tracker-page tracker-state">
        <div className="tracker-state-inner" role="status" aria-live="polite">
          <div className="tracker-spinner" aria-hidden="true" />
          <p className="tracker-loading-title">Loading Tracking</p>
          <p className="tracker-loading-sub">Verifying your booking…</p>
        </div>
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="tracker-page tracker-state">
        <div className="tracker-state-inner">
          <div className="tracker-error-card" role="alert">
            <p className="tracker-error-title">Tracking Unavailable</p>
            <p className="tracker-error-msg">{error}</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // ── Waiting for geolocation permission ────────────────────────────────────
  if (!customerLocation) {
    return (
      <div className="tracker-page tracker-state">
        <div className="tracker-state-inner" aria-live="polite">
          <div className="tracker-waiting-card">
            <div className="tracker-waiting-icon" aria-hidden="true">📍</div>
            <p className="tracker-waiting-title">Awaiting Your Location</p>
            <p className="tracker-waiting-sub">
              Please allow location access so we can show the route to your mechanic.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── Waiting for mechanic's first location ping ─────────────────────────────
  if (!mechanicLocation) {
    return (
      <div className="tracker-page tracker-state">
        <div className="tracker-state-inner" aria-live="polite">
          <div className="tracker-waiting-card">
            <div className="tracker-waiting-icon" aria-hidden="true">🔧</div>
            <p className="tracker-waiting-title">
              Waiting for {mechanicName || 'your mechanic'}
            </p>
            <p className="tracker-waiting-sub">
              Your mechanic hasn't shared their location yet. This page will update automatically.
            </p>
          </div>
          <div className="tracker-live-indicator" style={{ justifyContent: 'center', marginTop: '1rem' }}>
            <span
              className={`tracker-live-dot${socketConnected ? '' : ' connecting'}`}
              aria-hidden="true"
            />
            <span
              className={`tracker-live-text${socketConnected ? ' live' : ' connecting'}`}
              aria-live="polite"
            >
              {socketConnected ? 'Connected' : 'Connecting…'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ── Main tracking view ─────────────────────────────────────────────────────
  return (
    <div className="tracker-page">
      <div className="tracker-inner">

        {/* Page heading */}
        <header className="tracker-header">
          <div className="tracker-kicker" aria-hidden="true">
            <span className="tracker-kicker-line" />
            <span className="tracker-kicker-text">Live Tracking</span>
          </div>
          <h1 className="tracker-title">Track Your Mechanic</h1>
          <p className="tracker-subtitle">
            Real-time location updates for your booking
          </p>
        </header>

        {/* Mechanic info card */}
        <div className="tracker-info-card" role="region" aria-label="Mechanic info">
          <div className="tracker-info-left">
            {/* Avatar: first letter of name */}
            <div className="tracker-mechanic-avatar" aria-hidden="true">
              {mechanicName ? mechanicName.charAt(0).toUpperCase() : 'M'}
            </div>
            <div className="tracker-mechanic-details">
              <p className="tracker-mechanic-name">{mechanicName || 'Your Mechanic'}</p>
              <p className="tracker-mechanic-label">Assigned Mechanic</p>
            </div>
          </div>

          {/* Live / reconnecting indicator — shown once mechanic location has arrived */}
          <div className="tracker-live-indicator">
            <span
              className={`tracker-live-dot${socketConnected ? '' : ' connecting'}`}
              aria-hidden="true"
            />
            <span
              className={`tracker-live-text${socketConnected ? ' live' : ' connecting'}`}
              aria-live="polite"
            >
              {socketConnected ? 'Live' : 'Reconnecting…'}
            </span>
          </div>

          {/* ETA strip */}
          <div className="tracker-eta-strip" aria-label="Distance and ETA">
            <div className="tracker-eta-item">
              <span className="tracker-eta-label">Distance</span>
              <span className="tracker-eta-value">{distance || '—'}</span>
            </div>
            <div className="tracker-eta-divider" aria-hidden="true" />
            <div className="tracker-eta-item">
              <span className="tracker-eta-label">ETA</span>
              <span className="tracker-eta-value">{eta || '—'}</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div
          className="tracker-map-wrap"
          role="region"
          aria-label="Live map showing mechanic location"
        >
          <div className="tracker-map-container">
            <GoogleMap mapContainerStyle={containerStyle} center={customerLocation} zoom={14}>
              <MarkerF position={customerLocation} label="You" />
              {mechanicLocation && (
                <MarkerF position={mechanicLocation} icon={vanIcon} label={mechanicName} />
              )}
              {path.length === 2 && (
                <PolylineF
                  path={path}
                  options={{
                    strokeColor: '#834417',
                    strokeOpacity: 0.85,
                    strokeWeight: 3,
                  }}
                />
              )}
            </GoogleMap>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MechanicTracker;
