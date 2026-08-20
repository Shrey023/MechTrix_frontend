import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { CustomCursor } from './components/CustomCursorDemo';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';

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
import DeleteAccount from './pages/DeleteAccount';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminDashboard from './pages/AdminDashboard';
import AdminCustomers from './pages/AdminCustomers';
import AdminCustomerDetail from './pages/AdminCustomerDetail';
import AdminMechanics from './pages/AdminMechanics';
import AdminMechanicDetail from './pages/AdminMechanicDetail';

import MechanicTracker from './components/MechanicTracker'; // ✅ required for /track/:bookingId

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" replace />;
};

const CustomerProtectedRoute = ({ children }) => {
  const isCustomerLoggedIn = Boolean(localStorage.getItem('customerId') && localStorage.getItem('token'));
  return isCustomerLoggedIn ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>
      <CustomCursor />
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
        <Route
          path="/dashboard"
          element={
            <CustomerProtectedRoute>
              <CustomerDashboard />
            </CustomerProtectedRoute>
          }
        />
        <Route path="/track" element={<LiveTracking />} />
        <Route path="/track/:bookingId" element={<MechanicTracker />} /> {/* ✅ Track Mechanic */}
        <Route
          path="/booking"
          element={
            <CustomerProtectedRoute>
              <Booking />
            </CustomerProtectedRoute>
          }
        />
        <Route path="/nearby" element={<NearbyMechanics />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route
          path="/profile"
          element={
            <CustomerProtectedRoute>
              <CustomerProfile />
            </CustomerProtectedRoute>
          }
        />
        <Route path="/mechanic/dashboard" element={<MechanicDashboard />} />
        <Route path="/mechanic/navigate/:bookingId" element={<MechanicNavigator />} /> {/* ✅ Navigator */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Privacy Policy */}
        <Route path="/delete-account" element={<DeleteAccount />} /> {/* Account Deletion */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/customers"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminCustomers />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/customers/:id"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminCustomerDetail />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/mechanics"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminMechanics />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/mechanics/:id"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminMechanicDetail />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
      </Routes>
      <Footer />
      </Router>
    </>
  );
};

export default App;
