import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1><i className="fas fa-spades"></i> Card Game Contract</h1>
        <p>Decentralized Blackjack with Verifiable Randomness</p>
      </div>
    </header>
  );
};

export default Header; 