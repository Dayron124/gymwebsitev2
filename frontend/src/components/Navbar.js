import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/styles.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="brand-container">
          <Link to="/" className="brand-title">Dash Strength and Conditioning</Link>
          <div className="slogan">Commit to your future better self</div>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="#">Programs</Link>
            <div className="dropdown-menu">
              <Link to="/classes">Classes</Link>
              <Link to="/workouts">Workouts</Link>
            </div>
          </li>
          <li>
            <Link to="#">Community</Link>
            <div className="dropdown-menu">
              <Link to="/blogs">Blog</Link>
              <Link to="/events">Events</Link>
              <Link to="/forums">Forums</Link>
            </div>
          </li>
          {token ? (
            <div className="profile-dropdown" ref={dropdownRef}>
              <button
                className="profile-icon"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                👤 <span>Profile</span>
              </button>
              {dropdownOpen && (
                <div className="dropdown-content">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/preferences">Preferences</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
