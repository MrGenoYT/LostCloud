import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [bots, setBots] = useState([]);

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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
