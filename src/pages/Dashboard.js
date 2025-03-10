import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>Dashboard</h1>
      <p>Welcome to your LostCloud Dashboard!</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/create-bot" className="btn signup">Deploy Bot</Link>
        <Link to="/forum" className="btn login" style={{ marginLeft: '10px' }}>Forum</Link>
        <Link to="/help" className="btn" style={{ marginLeft: '10px' }}>Help</Link>
      </div>
    </div>
  );
}

export default Dashboard;
