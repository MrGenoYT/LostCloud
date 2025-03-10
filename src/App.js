import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CreateBot from './pages/CreateBot';
import Forum from './pages/Forum';
import Help from './pages/Help';
import PasswordResetRequest from './pages/PasswordResetRequest';
import PasswordReset from './pages/PasswordReset';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container fade-in" style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-bot" element={<CreateBot />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/help" element={<Help />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/request-password-reset" element={<PasswordResetRequest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
