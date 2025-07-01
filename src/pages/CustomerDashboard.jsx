
// CustomerDashboard.jsx (unchanged logic, retained CSS import)
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import ReviewForm from './ReviewForm';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const [activeBookings, setActiveBookings] = useState([]);
  const [oldBookings, setOldBookings] = useState([]);
  const [availableMechanics, setAvailableMechanics] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const customerId = localStorage.getItem('customerId');
      if (!customerId) {
        console.error("⚠️ No customerId found in localStorage");
        return;
      }

      try {
        const res = await axios.get(`/bookings/customer/${customerId}`);
        const active = res.data.filter(b => ['pending', 'accepted'].includes(b.status));
        const old = res.data.filter(b => ['rejected', 'cancelled', 'completed'].includes(b.status));
        setActiveBookings(active);
        setOldBookings(old);
      } catch (err) {
        console.error("❌ Error fetching bookings:", err.message);
      }
    };

    const fetchAvailableMechanics = async () => {
      try {
        const res = await axios.get('/mechanics/all');
        console.log("🔍 All fetched mechanics:", res.data);
        const onlyAvailable = res.data.filter(m => m.currentStatus === 'available');
        setAvailableMechanics(onlyAvailable);
      } catch (err) {
        console.error("❌ Error fetching mechanics:", err.message);
      }
    };

    fetchBookings();
    fetchAvailableMechanics();
  }, []);

  const handleBookMechanic = (mechanic) => {
    window.location.href = `/book/${mechanic._id}`;
  };

  return (
    <div className="dashboard">
      {/* 🧭 NAVBAR */}
      <nav className="navbar">
        <div className="logo">🔧 MechTrix</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/booking">Book Mechanic</Link>
          <Link to="/track">Track Mechanic</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>

      {/* 🏠 HERO SECTION */}
      <header className="hero">
        <h1>Fast, Reliable Mechanic Services</h1>
        <p>Anytime. Anywhere. Trusted by thousands.</p>
        <Link to="/nearby">
          <button className="cta-btn">Find Mechanics Near Me</button>
        </Link>
      </header>

      {/* 🔍 Browse Only Available Mechanics */}
      <section className="all-mechanics" style={{ padding: '2rem' }}>
        <h2>🟢 Available Mechanics</h2>
        {availableMechanics.length === 0 ? (
          <p>No mechanics available right now.</p>
        ) : (
          <div className="all-mechanics-grid">
            {availableMechanics.map(m => (
              <div key={m._id} className="mechanic-card">
                <h3>{m.name}</h3>
                <p>Status: <span className="text-green-600">{m.currentStatus}</span></p>
                <p>Experience: {m.experienceYears} yrs</p>
                <p>Services: {m.servicesOffered.join(', ')}</p>
                <p>Vehicles: {m.vehicleTypes.join(', ')}</p>
                <p>Radius: {m.serviceRadius} km</p>
                <button onClick={() => handleBookMechanic(m)} className="cta-btn small">Book Now</button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🛠 SERVICES */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="card">
            <img src="/images/breakdown.png" alt="Breakdown Repair" />
            <h3>Breakdown Repair</h3>
          </div>
          <div className="card">
            <img src="/images/schedule.png" alt="Scheduled Service" />
            <h3>Scheduled Service</h3>
          </div>
          <div className="card">
            <img src="/images/emergency.png" alt="Emergency Pickup" />
            <h3>Emergency Pickup</h3>
          </div>
        </div>
      </section>

      {/* 🔄 HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <ol>
          <li>📍 Book a nearby mechanic</li>
          <li>📡 Track their live location</li>
          <li>🔧 Get your vehicle fixed</li>
        </ol>
      </section>

      {/* 📋 BOOKINGS */}
      <section className="bookings" style={{ padding: '1rem' }}>
        <h2>My Bookings</h2>

        <h3>Active Bookings</h3>
        {activeBookings.length === 0 ? (
          <p>No active bookings.</p>
        ) : (
          activeBookings.map((booking) => (
            <div key={booking._id} className="booking-card active">
              <p><strong>Service:</strong> {booking.serviceRequired}</p>
              <p><strong>Mechanic:</strong> {booking.mechanic?.name || 'N/A'}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Scheduled:</strong> {new Date(booking.scheduledTime).toLocaleString()}</p>

              {booking.status === 'accepted' && (
                <Link to={`/track/${booking._id}`}>
                  <button style={{ marginTop: '0.5rem' }}>Track Mechanic</button>
                </Link>
              )}
            </div>
          ))
        )}

        <h3>Past Bookings</h3>
        {oldBookings.length === 0 ? (
          <p>No past bookings yet.</p>
        ) : (
          oldBookings.map((booking) => (
            <div key={booking._id} className="booking-card past">
              <p><strong>Service:</strong> {booking.serviceRequired}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Mechanic:</strong> {booking.mechanic?.name || 'N/A'}</p>
              <p><strong>Scheduled:</strong> {new Date(booking.scheduledTime).toLocaleString()}</p>

              {booking.status === 'completed' && (
                <div style={{ marginTop: '1rem' }}>
                  <ReviewForm mechanicId={booking.mechanic._id} bookingId={booking._id} />
                </div>
              )}
            </div>
          ))
        )}
      </section>

      {/* ⭐ REVIEWS */}
      <section className="reviews">
        <h2>Customer Reviews</h2>
        <div className="testimonial">
          <p>"The fastest roadside support I’ve ever had. Truly a lifesaver!"</p>
          <strong>– Himanshu Sharma</strong>
        </div>
      </section>

      {/* ⚙️ FOOTER */}
      <footer className="footer">
        <p>© 2025 MechTrix | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link></p>
      </footer>
    </div>
  );
};

export default CustomerDashboard;
