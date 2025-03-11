import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import EditBot from './pages/EditBot'; // Import the EditBot component


// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateBot from './pages/CreateBot';
import Forum from './pages/Forum';
import ForumPost from './pages/ForumPost';
import CreateForumPost from './pages/CreateForumPost';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import NotFound from './pages/NotFound';

function App() {
  const { loading, checkAuth } = useAuth();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      await checkAuth();
      setAppReady(true);
    };

    initApp();
  }, [checkAuth]);

  if (!appReady || loading) {
    return (
      <div className="flex items-center justify-center" style={{ height: '100vh' }}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="app-container" style={{ minHeight: 'calc(100vh - 140px)', paddingTop: '80px', paddingBottom: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-bot" element={<CreateBot />} />
            <Route path="/edit-bot/:id" element={<EditBot />} /> {/* Added route for EditBot */}
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/post/:id" element={<ForumPost />} />
            <Route path="/forum/create" element={<CreateForumPost />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;