import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// You can integrate a CAPTCHA component here if desired

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();
  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, form, { withCredentials: true });
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data.error || 'Signup failed');
    }
  };
  
  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password (min 6 characters)" onChange={handleChange} required />
        <button type="submit" className="btn signup">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
