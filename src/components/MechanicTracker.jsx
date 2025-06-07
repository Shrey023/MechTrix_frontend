import React, { useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const containerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: '10px',
  overflow: 'hidden',
};

const defaultCenter = {
  lat: 23.1308,
  lng: 79.90535,
};

function MechanicTracker() {
  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'REMOVED_GOOGLE_MAPS_KEY', // replace with your real API key
    libraries: ['places'],
  });

  // Get customer's current location from browser
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCustomerLocation({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.error('Geolocation error:', err);
        setCustomerLocation(defaultCenter);
      }
    );
  }, []);

  // Listen to mechanic's location via socket
  useEffect(() => {
    socket.on('locationUpdate', ({ coordinates }) => {
      setMechanicLocation({
        lat: coordinates[1],
        lng: coordinates[0],
      });
    });

    return () => socket.off('locationUpdate');
  }, []);

  // Calculate route, distance, and ETA
  useEffect(() => {
    if (mechanicLocation && customerLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: mechanicLocation,
          destination: customerLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
            const leg = result.routes[0].legs[0];
            setDistance(leg.distance.text);
            setDuration(leg.duration.text);
          } else {
            console.error('Directions request failed:', status);
          }
        }
      );
    }
  }, [mechanicLocation, customerLocation]);

  return isLoaded ? (
    <div
      style={{
        maxWidth: '960px',
        margin: '30px auto',
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: '#1e1e1e',
        boxShadow: '0 0 15px rgba(0,0,0,0.3)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Live Mechanic Tracking</h2>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={customerLocation || mechanicLocation || defaultCenter}
        zoom={14}
      >
        {customerLocation && (
          <Marker
            position={customerLocation}
            label="Customer"
            icon={{
              url: 'https://img.icons8.com/emoji/48/house-emoji.png',
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
        {mechanicLocation && (
          <Marker
            position={mechanicLocation}
            label="Mechanic"
            icon={{
              url: 'https://img.icons8.com/emoji/48/motorcycle-emoji.png',
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      <div
        style={{
          marginTop: '20px',
          fontSize: '18px',
          textAlign: 'center',
          backgroundColor: '#2b2b2b',
          padding: '12px',
          borderRadius: '10px',
        }}
      >
        {duration && distance ? (
          <>
            <strong>ETA:</strong> {duration} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Distance:</strong> {distance}
          </>
        ) : (
          <p>Calculating route...</p>
        )}
      </div>
    </div>
  ) : (
    <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>
      Loading Map...
    </div>
  );
}

export default MechanicTracker;
