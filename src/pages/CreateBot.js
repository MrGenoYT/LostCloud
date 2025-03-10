import React, { useState } from 'react';
import axios from 'axios';

function CreateBot() {
  const [form, setForm] = useState({ type: 'java', ip: '', port: '' });
  const [result, setResult] = useState(null);
  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/bots/create`, form, { withCredentials: true });
      setResult(res.data.bot);
    } catch (err) {
      alert(err.response?.data.error || 'Bot creation failed');
    }
  };
  
  return (
    <div className="form-container">
      <h2>Deploy a New Bot</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Edition:</label>
        <select name="type" onChange={handleChange}>
          <option value="java">Java Edition</option>
          <option value="bedrock">Bedrock Edition</option>
          <option value="java+bedrock">Java + Bedrock</option>
        </select>
        <input type="text" name="ip" placeholder="Server IP" onChange={handleChange} required />
        {(form.type === 'bedrock' || form.type === 'java+bedrock') && (
          <input type="number" name="port" placeholder="Server Port" onChange={handleChange} required />
        )}
        <button type="submit" className="btn signup">Deploy Bot</button>
      </form>
      {result && (
        <div className="result">
          <p>Bot created successfully!</p>
          <p><strong>Server ID:</strong> {result.serverId}</p>
          <p><strong>Server Key:</strong> {result.serverKey}</p>
        </div>
      )}
    </div>
  );
}

export default CreateBot;
