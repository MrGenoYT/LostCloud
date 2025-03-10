import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page" style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Welcome to LostCloud</h1>
      <p style={{ color: '#555', margin: '20px 0' }}>Manage your Minecraft server bots with ease.</p>
      <div>
        <Link to="/signup" className="btn signup">Get Started</Link>
        <Link to="/login" className="btn login" style={{ marginLeft: '10px' }}>Login</Link>
      </div>
    </div>
  );
}

export default Home;
