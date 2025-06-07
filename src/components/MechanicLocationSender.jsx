import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Use your deployed backend URL when deploying

function MechanicLocationSender() {
  useEffect(() => {
    const sendLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          socket.emit('mechanicLocation', {
            mechanicId: 'mechanic-123', // You can make this dynamic later
            coordinates: [longitude, latitude], // Same format used in backend
          });
          console.log('📡 Location sent:', latitude, longitude);
        });
      } else {
        console.error('Geolocation not supported');
      }
    };

    // Send initial location
    sendLocation();

    // Send location every 5 seconds
    const interval = setInterval(sendLocation, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold mb-4">Mechanic Location Emitter</h2>
      <p>Sending your live location to the server every 5 seconds...</p>
    </div>
  );
}

export default MechanicLocationSender;
