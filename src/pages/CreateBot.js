import React, { useState } from 'react';
import axios from 'axios';

function CreateBot() {
  const [form, setForm] = useState({ botName: '', type: 'java', ip: '', port: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/bots/create`, form, { withCredentials: true });
      setResult(res.data.bot);
      setForm({ botName: '', type: 'java', ip: '', port: '' }); // Reset form after successful submission
    } catch (err) {
      console.error(err);
      setError(err.response?.data.error || 'Bot creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Deploy a New Bot</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="botName">Bot Name:</label>
          <input
            type="text"
            id="botName"
            name="botName"
            placeholder="Enter bot name"
            value={form.botName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Select Edition:</label>
          <select id="type" name="type" value={form.type} onChange={handleChange}>
            <option value="java">Java Edition</option>
            <option value="bedrock">Bedrock Edition</option>
            <option value="java+bedrock">Java + Bedrock</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ip">Server IP:</label>
          <input
            type="text"
            id="ip"
            name="ip"
            placeholder="Server IP"
            value={form.ip}
            onChange={handleChange}
            required
          />
        </div>
        {(form.type === 'bedrock' || form.type === 'java+bedrock') && (
          <div className="form-group">
            <label htmlFor="port">Server Port:</label>
            <input
              type="number"
              id="port"
              name="port"
              placeholder="Server Port"
              value={form.port}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button type="submit" className="btn signup" disabled={loading}>
          {loading ? 'Deploying...' : 'Deploy Bot'}
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {result && (
        <div className="result" style={{ marginTop: '20px' }}>
          <p>Bot "{result.botName}" created successfully!</p>
          <p>
            <strong>Server ID:</strong> {result.serverId}
          </p>
          <p>
            <strong>Server Key:</strong> {result.serverKey}
          </p>
        </div>
      )}
    </div>
  );
}

export default CreateBot;
