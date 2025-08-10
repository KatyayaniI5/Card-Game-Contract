import React from 'react';
import './Card.css';

const Card = ({ value }) => {
  const getDisplayValue = () => {
    if (value === 1) return 'A';
    if (value === 11) return 'J';
    if (value === 12) return 'Q';
    if (value === 13) return 'K';
    return value;
  };

  const getSuit = () => {
    if (value === 1 || value === 11 || value === 12 || value === 13) {
      return '♥';
    }
    return '♠';
  };

  const isRed = value === 1 || value === 11 || value === 12 || value === 13;

  return (
    <div className={`card ${isRed ? 'red' : 'black'}`}>
      <div className="card-value">{getDisplayValue()}</div>
      <div className="card-suit">{getSuit()}</div>
    </div>
  );
};

export default Card; 