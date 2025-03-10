import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function PasswordReset() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('id');
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, { userId, token, password });
      setMessage(res.data.message);
    } catch (err) {
      alert(err.response?.data.error || 'Reset failed');
    }
  };
  
  return (
    <div className="form-container">
      <h2>Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn signup">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PasswordReset;
