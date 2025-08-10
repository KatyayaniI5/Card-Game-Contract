import React from 'react';
import './GameResult.css';

const GameResult = ({ game, onPlayAgain }) => {
  const determineWinner = () => {
    if (game.playerScore > 21) {
      return {
        text: 'Bust! You Lose',
        details: `Your score: ${game.playerScore} (over 21)`,
        isWin: false
      };
    } else if (game.dealerScore > 21) {
      return {
        text: 'Dealer Bust! You Win!',
        details: `Dealer score: ${game.dealerScore} (over 21)`,
        isWin: true
      };
    } else if (game.playerScore > game.dealerScore) {
      return {
        text: 'You Win!',
        details: `Your score: ${game.playerScore} vs Dealer: ${game.dealerScore}`,
        isWin: true
      };
    } else if (game.playerScore < game.dealerScore) {
      return {
        text: 'Dealer Wins',
        details: `Dealer score: ${game.dealerScore} vs Yours: ${game.playerScore}`,
        isWin: false
      };
    } else {
      return {
        text: "It's a Tie!",
        details: `Both scores: ${game.playerScore}`,
        isWin: null
      };
    }
  };

  const result = determineWinner();

  return (
    <div className="game-result">
      <h2 className={`result-text ${result.isWin === true ? 'win' : result.isWin === false ? 'lose' : 'tie'}`}>
        {result.text}
      </h2>
      <p className="result-details">{result.details}</p>
      <div className="final-scores">
        <div className="score-item">
          <span className="score-label">Your Score:</span>
          <span className="score-value">{game.playerScore}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Dealer Score:</span>
          <span className="score-value">{game.dealerScore}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Bet Amount:</span>
          <span className="score-value">{game.betAmount} APT</span>
        </div>
      </div>
      <button className="new-game-btn" onClick={onPlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default GameResult; 