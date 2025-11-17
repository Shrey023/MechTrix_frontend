import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import UserRegister from './pages/UserRegister';
import MechanicRegister from './pages/MechanicRegister';
import MechanicLogin from './pages/MechanicLogin';
import CustomerDashboard from './pages/CustomerDashboard';
import LiveTracking from './pages/LiveTracking';
import Booking from './pages/Booking';
import MechanicProfile from './pages/MechanicProfile';
import NearbyMechanics from './pages/NearbyMechanics';
import BookingPage from './pages/BookingPage';
import CustomerProfile from './pages/CustomerProfile';
import MechanicDashboard from './pages/MechanicDashboard';
import MechanicNavigator from './pages/MechanicNavigator'; // ✅ fixed
import PrivacyPolicy from './pages/PrivacyPolicy';

import MechanicTracker from './components/MechanicTracker'; // ✅ required for /track/:bookingId

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Userregister" element={<UserRegister />} />
        <Route path="/MechanicRegister" element={<MechanicRegister />} />
        <Route path="/mechanic/login" element={<MechanicLogin />} />
        <Route path="/mechanic/register" element={<MechanicRegister />} />
        <Route path="/mechanic/profile" element={<MechanicProfile />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/track" element={<LiveTracking />} />
        <Route path="/track/:bookingId" element={<MechanicTracker />} /> {/* ✅ Track Mechanic */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/nearby" element={<NearbyMechanics />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/profile" element={<CustomerProfile />} />
        <Route path="/mechanic/dashboard" element={<MechanicDashboard />} />
        <Route path="/mechanic/navigate/:bookingId" element={<MechanicNavigator />} /> {/* ✅ Navigator */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Privacy Policy */}
      </Routes>
    </Router>
  );
};

export default App;
