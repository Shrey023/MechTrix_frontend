import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // update if hosted

const MechanicLocationSender = () => {
  const mechanicId = localStorage.getItem('mechanicId');

  useEffect(() => {
    const sendLocation = () => {
      if (navigator.geolocation && mechanicId) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = [pos.coords.longitude, pos.coords.latitude];
            socket.emit('mechanicLocation', { mechanicId, coordinates: coords });
            console.log('📤 Sent mechanic location:', coords);
          },
          (err) => {
            console.error('❌ Geolocation error:', err);
          }
        );
      }
    };

    const interval = setInterval(sendLocation, 5000);
    return () => clearInterval(interval);
  }, [mechanicId]);

  return <p>📡 Sending your live location...</p>;
};

export default MechanicLocationSender;
