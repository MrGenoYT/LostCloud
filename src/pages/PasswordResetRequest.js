import React, { useState } from 'react';
import axios from 'axios';

function PasswordResetRequest() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/request-password-reset`, { email });
      setMessage(res.data.message);
    } catch (err) {
      alert(err.response?.data.error || 'Request failed');
    }
  };
  
  return (
    <div className="form-container">
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit" className="btn signup">Send Reset Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PasswordResetRequest;
