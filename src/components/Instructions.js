import React from 'react';
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="instructions">
      <h3><i className="fas fa-info-circle"></i> How to Play</h3>
      <div className="instruction-grid">
        <div className="instruction-item">
          <i className="fas fa-wallet"></i>
          <h4>1. Connect Wallet</h4>
          <p>Connect your Aptos wallet to start playing</p>
        </div>
        <div className="instruction-item">
          <i className="fas fa-coins"></i>
          <h4>2. Place Bet</h4>
          <p>Enter your bet amount and start the game</p>
        </div>
        <div className="instruction-item">
          <i className="fas fa-gamepad"></i>
          <h4>3. Play Blackjack</h4>
          <p>Get as close to 21 as possible without going over</p>
        </div>
        <div className="instruction-item">
          <i className="fas fa-trophy"></i>
          <h4>4. Win & Collect</h4>
          <p>Beat the dealer to win double your bet!</p>
        </div>
      </div>
    </div>
  );
};

export default Instructions; 