import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL);

function Dashboard() {
  const [bots, setBots] = useState([]);
  const [botStatuses, setBotStatuses] = useState({});

  useEffect(() => {
    async function fetchBots() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/bots/list`, { withCredentials: true });
        setBots(res.data.bots);
      } catch (err) {
        console.error(err);
      }
    }
    fetchBots();

    // Listen for bot status updates
    socket.on('botStatusUpdate', (statuses) => {
      const statusMap = {};
      statuses.forEach(({ serverId, status }) => {
        statusMap[serverId] = status;
      });
      setBotStatuses(statusMap);
    });

    return () => socket.off('botStatusUpdate');
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {bots.length === 0 ? (
        <p>No bots created yet.</p>
      ) : (
        <ul>
          {bots.map(bot => (
            <li key={bot.serverId}>
              <strong>{bot.botName}</strong> ({bot.type})  
              <p>Server ID: {bot.serverId}</p>
              <p>IP: {bot.ip}</p>
              <p>Status: <span style={{ color: botStatuses[bot.serverId] === 'Online' ? 'green' : 'red' }}>
                {botStatuses[bot.serverId] || 'Unknown'}
              </span></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
