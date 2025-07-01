import React, { useState } from 'react';
import axios from './axios';
import './Booking.css';

const Booking = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [problem, setProblem] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://mechtrix.onrender.com/api/bookings', {
        vehicleType,
        problem,
        date,
        time,
        customerId: 'customerIdHere', // Replace with actual logged-in user ID
        mechanicId: 'mechanicIdHere', // Replace with selected mechanic ID
      });

      if (response.status === 201) {
        setMessage('Booking confirmed!');
      }
    } catch (error) {
      setMessage('Booking failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="booking-container">
      <h2 className="booking-title">Book a Mechanic</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <label>
          Vehicle Type:
          <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required>
            <option value="">-- Select --</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
            <option value="scooter">Scooter</option>
          </select>
        </label>

        <label>
          Describe Problem:
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Flat tire, engine issue, etc."
            required
          />
        </label>

        <label>
          Preferred Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>

        <label>
          Preferred Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </label>

        <button type="submit" className="submit-btn">Confirm Booking</button>
      </form>

      {message && <p className="booking-message">{message}</p>}
    </div>
  );
};

export default Booking;
