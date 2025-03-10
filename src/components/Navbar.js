import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">LostCloud</Link>
        <div className="navbar-links desktop-only">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/create-bot">Deploy Bot</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/help">Help</Link>
          <Link to="/signup" className="btn signup">Sign Up</Link>
          <Link to="/login" className="btn login">Login</Link>
        </div>
        <div className="mobile-only">
          <button onClick={() => setOpen(!open)} className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-menu">
          <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/create-bot" onClick={() => setOpen(false)}>Deploy Bot</Link>
          <Link to="/forum" onClick={() => setOpen(false)}>Forum</Link>
          <Link to="/help" onClick={() => setOpen(false)}>Help</Link>
          <Link to="/signup" onClick={() => setOpen(false)} className="btn signup">Sign Up</Link>
          <Link to="/login" onClick={() => setOpen(false)} className="btn login">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
