import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/styles.css'; // Ensure path is correct

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2 className="sidebar-logo">Admin</h2>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/users">Users</Link></li>
          <li><Link to="/admin/settings" className="settings">Settings</Link></li>
          <li><Link to="/admin/reports">Reports</Link></li>
        </ul>
      </aside>

      <div className="admin-content">
        <header className="admin-header">
          <h1 className="header-title">Admin Dashboard</h1>
          <div className="user-profile">
            <img src="/path-to-profile-image.jpg" alt="Profile" className="profile-img" />
            <span className="user-name">Admin Name</span>
          </div>
        </header>

        <main className="main-content">
          <section className="overview">
            <div className="card">
              <h3 className="card-title">Total Users</h3>
              <p className="card-value">1,234</p>
            </div>
            <div className="card">
              <h3 className="card-title">New Signups</h3>
              <p className="card-value">56</p>
            </div>
            <div className="card">
              <h3 className="card-title">Pending Orders</h3>
              <p className="card-value">12</p>
            </div>
            <div className="card">
              <h3 className="card-title">Total Revenue</h3>
              <p className="card-value">$5,678</p>
            </div>
          </section>

          <section className="recent-activity">
            <h2 className="section-title">Recent Activity</h2>
            <ul className="activity-list">
              <li className="activity-item">
                <p className="activity-description">User John Doe has signed up.</p>
                <span className="activity-time">10 minutes ago</span>
              </li>
              <li className="activity-item">
                <p className="activity-description">Order #1234 has been placed.</p>
                <span className="activity-time">30 minutes ago</span>
              </li>
              <li className="activity-item">
                <p className="activity-description">User Jane Smith updated profile.</p>
                <span className="activity-time">1 hour ago</span>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
