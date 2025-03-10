import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, form, { withCredentials: true });
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data.error || 'Login failed');
    }
  };
  
  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="btn signup">Login</button>
      </form>
      <p>
        Forgot your password? <a href="/request-password-reset">Reset here</a>
      </p>
    </div>
  );
}

export default Login;
