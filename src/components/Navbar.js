import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  // Restore dark mode toggle functionality:
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'enabled');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">LostCloud</Link>

        {/* Desktop Navigation */}
        <div className="desktop-only">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/create-bot">Deploy Bot</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/help">Help</Link>
          <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
          <Link to="/signup" className="btn signup">Sign Up</Link>
          <Link to="/login" className="btn login">Login</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="mobile-only">
          <button onClick={() => setOpen(!open)} className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/create-bot" onClick={() => setOpen(false)}>Deploy Bot</Link>
          <Link to="/forum" onClick={() => setOpen(false)}>Forum</Link>
          <Link to="/help" onClick={() => setOpen(false)}>Help</Link>
          <button onClick={() => { setDarkMode(!darkMode); setOpen(false); }} className="dark-mode-toggle">
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
          <Link to="/signup" onClick={() => setOpen(false)} className="btn signup">Sign Up</Link>
          <Link to="/login" onClick={() => setOpen(false)} className="btn login">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
