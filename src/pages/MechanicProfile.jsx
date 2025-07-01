import React, { useState } from 'react';
import axios from '../api/axios';

const BookingForm = ({ mechanic }) => {
  const [vehicleType, setVehicleType] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [serviceRequired, setServiceRequired] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [message, setMessage] = useState('');

  const customerId = localStorage.getItem('customerId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!navigator.geolocation) {
      return setMessage('Geolocation not supported by browser');
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const coords = [position.coords.longitude, position.coords.latitude];

      try {
        const res = await axios.post('/bookings', {
          customerId,
          mechanicId: mechanic._id,
          vehicleType,
          issueDescription,
          serviceRequired,
          scheduledTime,
          location: {
            type: 'Point',
            coordinates: coords
          },
          price: 0
        });

        setMessage('Booking successful!');
      } catch (err) {
        console.error(err);
        setMessage('Booking failed.');
      }
    });
  };

  return (
    <div className="booking-form">
      <h2>Book Mechanic: {mechanic.name}</h2>
      <form onSubmit={handleSubmit}>
        <input value={vehicleType} onChange={e => setVehicleType(e.target.value)} placeholder="Vehicle Type" required />
        <textarea value={issueDescription} onChange={e => setIssueDescription(e.target.value)} placeholder="Issue Description" required />
        <input value={serviceRequired} onChange={e => setServiceRequired(e.target.value)} placeholder="Service Required" required />
        <input type="datetime-local" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)} required />
        <button type="submit">Book Now</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingForm;
