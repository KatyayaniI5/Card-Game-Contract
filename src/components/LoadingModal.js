import React from 'react';
import './LoadingModal.css';

const LoadingModal = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <div className="loading-modal">
      <div className="loading-content">
        <div className="spinner"></div>
        <p className="loading-text">{message}</p>
      </div>
    </div>
  );
};

export default LoadingModal; 