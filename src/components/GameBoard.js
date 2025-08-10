import React from 'react';
import Card from './Card';
import './GameBoard.css';

const GameBoard = ({ game, onHit, onStand }) => {
  const formatAddress = (address) => {
    if (!address) return '-';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="game-board">
      <div className="dealer-section">
        <h3><i className="fas fa-crown"></i> Dealer</h3>
        <div className="cards dealer-cards">
          {game.dealerCards.map((card, index) => (
            <Card key={index} value={card} />
          ))}
        </div>
        <div className="score">Score: {game.dealerScore}</div>
      </div>

      <div className="player-section">
        <h3><i className="fas fa-user"></i> Player</h3>
        <div className="cards player-cards">
          {game.playerCards.map((card, index) => (
            <Card key={index} value={card} />
          ))}
        </div>
        <div className="score">Score: {game.playerScore}</div>
      </div>

      <div className="game-actions">
        <button className="action-btn hit-btn" onClick={onHit}>
          <i className="fas fa-plus"></i> Hit
        </button>
        <button className="action-btn stand-btn" onClick={onStand}>
          <i className="fas fa-hand-paper"></i> Stand
        </button>
      </div>

      <div className="game-info">
        <p>Bet Amount: {game.betAmount} APT</p>
        <p>Status: {game.gameActive ? 'Active' : 'Finished'}</p>
      </div>
    </div>
  );
};

export default GameBoard; 