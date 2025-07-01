// src/pages/MechanicNavigator.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMap, MarkerF, PolylineF, useJsApiLoader } from '@react-google-maps/api';
import axios from '../api/axios';

const containerStyle = {
  width: '100%',
  height: '90vh',
};

const MechanicNavigator = () => {
  const { bookingId } = useParams();
  const [mechanicLoc, setMechanicLoc] = useState(null);
  const [customerLoc, setCustomerLoc] = useState(null);
  const [eta, setEta] = useState('');
  const [distance, setDistance] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`/bookings/${bookingId}`);
        const coords = res.data.location.coordinates;
        setCustomerLoc({ lat: coords[1], lng: coords[0] }); // [lng, lat]
      } catch (err) {
        console.error('❌ Failed to fetch booking:', err);
      }
    };

    const watchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (pos) => {
            setMechanicLoc({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            });
          },
          (err) => {
            console.error("❌ Geolocation error:", err);
          },
          { enableHighAccuracy: true }
        );
      }
    };

    fetchBooking();
    watchLocation();
  }, [bookingId]);

  useEffect(() => {
    if (!mechanicLoc || !customerLoc || !isLoaded) return;

    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: mechanicLoc,
        destination: customerLoc,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          const leg = result.routes[0].legs[0];
          setEta(leg.duration.text);
          setDistance(leg.distance.text);
        }
      }
    );
  }, [mechanicLoc, customerLoc, isLoaded]);

  const path = mechanicLoc && customerLoc ? [mechanicLoc, customerLoc] : [];

  const vanIcon = {
    url: 'https://cdn-icons-png.flaticon.com/512/296/296216.png',
    scaledSize: { width: 40, height: 40 },
  };

  if (!mechanicLoc || !customerLoc || !isLoaded) return <p>Loading route map...</p>;

  return (
    <div>
      <div style={{ padding: '1rem', background: '#f0f0f0' }}>
        <strong>ETA:</strong> {eta || '...'} | <strong>Distance:</strong> {distance || '...'}
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={mechanicLoc} zoom={14}>
        <MarkerF position={mechanicLoc} icon={vanIcon} label="You" />
        <MarkerF position={customerLoc} label="Customer" />
        <PolylineF path={path} options={{ strokeColor: '#007BFF', strokeWeight: 4 }} />
      </GoogleMap>
    </div>
  );
};

export default MechanicNavigator;
