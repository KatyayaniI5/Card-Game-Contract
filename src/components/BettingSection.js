import React, { useState } from 'react';
import './BettingSection.css';

const BettingSection = ({ onStartGame }) => {
  const [betAmount, setBetAmount] = useState('');

  const handleStartGame = () => {
    const amount = parseFloat(betAmount);
    if (!amount || amount <= 0) {
      alert('Please enter a valid bet amount');
      return;
    }
    onStartGame(amount);
  };

  return (
    <div className="betting-section">
      <h3><i className="fas fa-coins"></i> Place Your Bet</h3>
      <div className="bet-input">
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Enter bet amount in APT"
          min="0.1"
          step="0.1"
        />
        <button 
          className="start-game-btn"
          onClick={handleStartGame}
          disabled={!betAmount || parseFloat(betAmount) <= 0}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default BettingSection; 