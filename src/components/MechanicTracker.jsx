import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, MarkerF, PolylineF, useJsApiLoader } from '@react-google-maps/api';
import { io } from 'socket.io-client';
import axios from '../api/axios';

const socket = io(import.meta.env.VITE_BACKEND_URL);

const containerStyle = {
  width: '100%',
  height: '90vh',
};

const MechanicTracker = () => {
  const { bookingId } = useParams();
  const [mechanicId, setMechanicId] = useState(null);
  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [eta, setEta] = useState(null);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const getBookingDetails = async () => {
      try {
        const res = await axios.get(`/bookings/${bookingId}`);
        setMechanicId(res.data.mechanic._id);

        navigator.geolocation.getCurrentPosition((pos) => {
          setCustomerLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        });
      } catch (err) {
        console.error("❌ Failed to fetch booking:", err.message);
      } finally {
        setLoading(false);
      }
    };

    getBookingDetails();
  }, [bookingId]);

  useEffect(() => {
    if (!mechanicId) return;

    socket.on('locationUpdate', ({ mechanicId: incomingId, coordinates }) => {
      if (incomingId === mechanicId) {
        const location = {
          lat: coordinates[1],
          lng: coordinates[0],
        };
        setMechanicLocation(location);
      }
    });

    return () => {
      socket.off('locationUpdate');
    };
  }, [mechanicId]);

  // 🧠 Calculate ETA and distance
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
    scaledSize: { width: 40, height: 40 },
  };

  if (loading || !isLoaded) return <p>Loading tracking info...</p>;
  if (!customerLocation || !mechanicLocation) return <p>Waiting for live location...</p>;

  return (
    <div>
      <div style={{ padding: '1rem', background: '#f0f0f0' }}>
        <strong>📍 Distance:</strong> {distance || '...'} |
        <strong> 🚗 ETA:</strong> {eta || '...'}
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={customerLocation} zoom={14}>
        <MarkerF position={customerLocation} label="You" />
        <MarkerF position={mechanicLocation} icon={vanIcon} />
        <PolylineF
          path={path}
          options={{
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 3,
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default MechanicTracker;
