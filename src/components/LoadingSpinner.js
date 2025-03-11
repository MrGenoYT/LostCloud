
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  width: ${props => {
    switch (props.size) {
      case 'small':
        return '20px';
      case 'large':
        return '50px';
      default:
        return '30px';
    }
  }};
  height: ${props => {
    switch (props.size) {
      case 'small':
        return '20px';
      case 'large':
        return '50px';
      default:
        return '30px';
    }
  }};
  border: ${props => {
    switch (props.size) {
      case 'small':
        return '2px';
      case 'large':
        return '4px';
      default:
        return '3px';
    }
  }} solid rgba(0, 0, 0, 0.1);
  border-top: ${props => {
    switch (props.size) {
      case 'small':
        return '2px';
      case 'large':
        return '4px';
      default:
        return '3px';
    }
  }} solid var(--primary-color);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

function LoadingSpinner({ size = 'medium' }) {
  return (
    <SpinnerContainer>
      <Spinner size={size} />
    </SpinnerContainer>
  );
}

export default LoadingSpinner;
