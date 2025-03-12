import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { GoogleAuthProvider } from './context/GoogleAuthContext'; // Added Google Auth Provider
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GoogleAuthProvider> {/* Wrapped App with GoogleAuthProvider */}
          <App />
        </GoogleAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
