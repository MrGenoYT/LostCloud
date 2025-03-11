import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

// Initialize WebSocket connection to your backend
const socket = io(process.env.REACT_APP_API_URL);

function Dashboard() {
  const [bots, setBots] = useState([]);
  const [botStatuses, setBotStatuses] = useState({});

  useEffect(() => {
    // Fetch the list of bots for the logged-in user
    async function fetchBots() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/bots/list`, { withCredentials: true });
        setBots(res.data.bots);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBots();

    // Listen for real-time bot status updates
    socket.on('botStatusUpdate', (statuses) => {
      const statusMap = {};
      statuses.forEach(({ serverId, status }) => {
        statusMap[serverId] = status;
      });
      setBotStatuses(statusMap);
    });

    // Clean up on unmount
    return () => {
      socket.off('botStatusUpdate');
    };
  }, []);

  return (
    <div className="dashboard" style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>Dashboard</h1>
      <p>Welcome to your LostCloud Dashboard!</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/create-bot" className="btn signup">Deploy Bot</Link>
        <Link to="/forum" className="btn login" style={{ marginLeft: '10px' }}>Forum</Link>
        <Link to="/help" className="btn" style={{ marginLeft: '10px' }}>Help</Link>
      </div>
      {bots.length === 0 ? (
        <p style={{ marginTop: '20px' }}>No bots created yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
          {bots.map(bot => (
            <li key={bot.serverId} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
              <strong>{bot.botName}</strong> ({bot.type})
              <p>Server ID: {bot.serverId}</p>
              <p>IP: {bot.ip}</p>
              <p>
                Status:{' '}
                <span style={{ color: botStatuses[bot.serverId] === 'Online' ? 'green' : 'red' }}>
                  {botStatuses[bot.serverId] || 'Unknown'}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
