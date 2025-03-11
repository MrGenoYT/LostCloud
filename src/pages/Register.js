import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const FormCard = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 150%;
    height: 200px;
    background: var(--gradient-primary);
    top: -120px;
    left: -50px;
    transform: rotate(-8deg);
    border-radius: 30%;
    z-index: 0;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: var(--text-color);
  position: relative;
  z-index: 1;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
`;

const InputGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.5rem;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(78, 84, 200, 0.1);
    outline: none;
  }
`;

const ErrorMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff0f0;
  color: var(--error-color);
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f0fff0;
  color: var(--success-color);
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    opacity: 0;
    z-index: -1;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
    
    &::after {
      opacity: 0.1;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #b3c7e6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const GoogleButton = styled(SubmitButton)`
  background-color: #4285f4;
  margin-top: 1rem;

  &:hover {
    background-color: #3367d6;
  }
`;

const ButtonIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const SpinnerIcon = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: var(--text-light);

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #eee;
  }

  span {
    padding: 0 1rem;
    font-size: 0.875rem;
  }
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-light);
  font-size: 0.875rem;
`;

const FooterLink = styled(Link)`
  color: var(--primary-color);
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }
`;

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    
    if (formData.password.length < 8) {
      setFormError('Password must be at least 8 characters long');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    setFormError('');
    setSuccess('');
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`, 
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        }
      );
      
      setSuccess(response.data.message);
      // Clear form
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Redirect to login after successful registration or wait for user to click link
      // Uncomment the following line to redirect automatically:
      // setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setFormError(err.response?.data.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = () => {
    // This would connect to your Google auth endpoint
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
  };
  
  return (
    <PageContainer>
      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FormTitle>Create Account</FormTitle>
        
        <AnimatePresence>
          {formError && (
            <ErrorMessage
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaExclamationTriangle /> {formError}
            </ErrorMessage>
          )}
          
          {success && (
            <SuccessMessage
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {success}
            </SuccessMessage>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="username">Username</FormLabel>
            <InputGroup>
              <InputIcon>
                <FaUser />
              </InputIcon>
              <FormInput
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
              />
            </InputGroup>
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <InputGroup>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </InputGroup>
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <FormInput
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </InputGroup>
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <InputGroup>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <FormInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </InputGroup>
          </FormGroup>
          
          <SubmitButton
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <>
                <SpinnerIcon><FaSpinner /></SpinnerIcon> Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </SubmitButton>
        </form>
        
        <Divider>
          <span>OR</span>
        </Divider>
        
        <GoogleButton
          type="button"
          onClick={handleGoogleLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ButtonIcon>
            <FaGoogle />
          </ButtonIcon>
          Sign up with Google
        </GoogleButton>
        
        <FooterText>
          Already have an account? <FooterLink to="/login">Login</FooterLink>
        </FooterText>
      </FormCard>
    </PageContainer>
  );
}

export default Register;
