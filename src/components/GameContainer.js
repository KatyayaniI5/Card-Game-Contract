import React, { useState } from 'react';
import BettingSection from './BettingSection';
import GameBoard from './GameBoard';
import './GameContainer.css';

const GameContainer = ({ 
  account, 
  wallet, 
  currentGame, 
  setCurrentGame, 
  contractAddress, 
  moduleName, 
  showLoading, 
  hideLoading 
}) => {
  const [gameState, setGameState] = useState('betting');

  const startGame = async (betAmount) => {
    if (!account || !wallet) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      showLoading('Starting game...');
      
      const payload = {
        function: `${contractAddress}::${moduleName}::start_game`,
        type_arguments: [],
        arguments: [Math.floor(betAmount * Math.pow(10, 8))]
      };

      const transaction = await wallet.signAndSubmitTransaction(payload);
      await wallet.waitForTransaction({ transactionHash: transaction.hash });
      
      hideLoading();
      
      const newGame = {
        betAmount: betAmount,
        playerCards: [],
        dealerCards: [],
        playerScore: 0,
        dealerScore: 0,
        gameActive: true
      };
      
      await simulateGameStart(newGame);
      setCurrentGame(newGame);
      setGameState('playing');
      
    } catch (error) {
      hideLoading();
      console.error('Failed to start game:', error);
      alert('Failed to start game. Please try again.');
    }
  };

  const simulateGameStart = async (game) => {
    const seed = Date.now() + Math.random();
    const playerCard1 = (seed % 13) + 1;
    const playerCard2 = ((seed / 13) % 13) + 1;
    const dealerCard = ((seed / 169) % 13) + 1;
    
    game.playerCards = [playerCard1, playerCard2];
    game.dealerCards = [dealerCard];
    game.playerScore = calculateScore(game.playerCards);
    game.dealerScore = calculateScore(game.dealerCards);
  };

  const calculateScore = (cards) => {
    return cards.reduce((score, card) => {
      if (card > 10) return score + 10;
      return score + card;
    }, 0);
  };

  const hit = () => {
    if (!currentGame || !currentGame.gameActive) return;
    
    const seed = Date.now() + Math.random();
    const newCard = (seed % 13) + 1;
    
    const updatedGame = { ...currentGame };
    updatedGame.playerCards.push(newCard);
    updatedGame.playerScore = calculateScore(updatedGame.playerCards);
    
    if (updatedGame.playerScore > 21) {
      updatedGame.gameActive = false;
      setGameState('result');
    }
    
    setCurrentGame(updatedGame);
  };

  const stand = async () => {
    if (!currentGame || !currentGame.gameActive) return;
    
    try {
      showLoading('Finishing game...');
      
      const payload = {
        function: `${contractAddress}::${moduleName}::finish_game`,
        type_arguments: [],
        arguments: []
      };

      const transaction = await wallet.signAndSubmitTransaction(payload);
      await wallet.waitForTransaction({ transactionHash: transaction.hash });
      
      hideLoading();
      
      const updatedGame = { ...currentGame };
      simulateDealerPlay(updatedGame);
      updatedGame.gameActive = false;
      setCurrentGame(updatedGame);
      setGameState('result');
      
    } catch (error) {
      hideLoading();
      console.error('Failed to finish game:', error);
      alert('Failed to finish game. Please try again.');
    }
  };

  const simulateDealerPlay = (game) => {
    while (game.dealerScore < 17) {
      const seed = Date.now() + Math.random();
      const newCard = (seed % 13) + 1;
      game.dealerCards.push(newCard);
      game.dealerScore = calculateScore(game.dealerCards);
    }
  };

  const resetGame = () => {
    setCurrentGame(null);
    setGameState('betting');
  };

  if (!account) {
    return null;
  }

  return (
    <div className="game-container">
      {gameState === 'betting' && (
        <BettingSection onStartGame={startGame} />
      )}
      
      {gameState === 'playing' && currentGame && (
        <GameBoard 
          game={currentGame}
          onHit={hit}
          onStand={stand}
        />
      )}
      
      {gameState === 'result' && currentGame && (
        <GameResult 
          game={currentGame}
          onPlayAgain={resetGame}
        />
      )}
    </div>
  );
};

export default GameContainer; 