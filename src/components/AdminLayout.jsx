import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const emailToShow = localStorage.getItem('adminEmail') || 'Admin';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Hide public Navbar and Footer when admin layout is mounted
  useEffect(() => {
    // Use specific class selector for Navbar
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('footer');
    
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';

    // Restore on unmount
    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      {/* Mobile Menu Toggle */}
      <button 
        className="admin-mobile-toggle" 
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="admin-sidebar-overlay" 
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h2 className="admin-brand">MECHZE</h2>
          <span className="admin-brand-subtitle">Admin Panel</span>
        </div>

        <nav className="admin-nav">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
            onClick={closeSidebar}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            to="/admin/customers" 
            className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
            onClick={closeSidebar}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Customers</span>
          </NavLink>

          <NavLink 
            to="/admin/mechanics" 
            className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
            onClick={closeSidebar}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
            <span>Mechanics</span>
          </NavLink>

          <NavLink 
            to="/admin/bookings" 
            className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
            onClick={closeSidebar}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Bookings</span>
          </NavLink>

          <NavLink 
            to="/admin/guftagu" 
            className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
            onClick={closeSidebar}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Guftagu</span>
          </NavLink>

          <NavLink 
            to="/admin/settings" 
            className={({ isActive }) => isActive ? 'admin-nav-item active' : 'admin-nav-item'}
            onClick={closeSidebar}
          >
            <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m7.07-16.93l-4.24 4.24M9.17 14.76l-4.24 4.24M23 12h-6m-6 0H1m16.93 7.07l-4.24-4.24M9.17 9.24L4.93 4.93"></path>
            </svg>
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {emailToShow.charAt(0).toUpperCase()}
            </div>
            <div className="admin-user-details">
              <span className="admin-user-email">{emailToShow}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="admin-logout-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
