import React, { useState, useEffect } from 'react';
import { AptosClient, AptosAccount, CoinClient } from '@aptos-labs/ts-sdk';
import Header from './components/Header';
import ConnectionStatus from './components/ConnectionStatus';
import GameContainer from './components/GameContainer';
import Instructions from './components/Instructions';
import Footer from './components/Footer';
import LoadingModal from './components/LoadingModal';
import './App.css';

const CONTRACT_ADDRESS = "8a8f14ff1b479e2cb22460df0d4fc002233a91f72239539d72eddd9a276a0dc3";
const MODULE_NAME = "CardGame";

function App() {
  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState(null);
  const [currentGame, setCurrentGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    initializeWallet();
  }, []);

  const initializeWallet = async () => {
    if (window.aptos) {
      try {
        const connected = await window.aptos.isConnected();
        if (connected) {
          const account = await window.aptos.account();
          setAccount(account);
          setWallet(window.aptos);
        }
      } catch (error) {
        console.error('Failed to initialize wallet:', error);
      }
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.aptos) {
        alert('Please install Petra wallet extension');
        return;
      }

      const response = await window.aptos.connect();
      setAccount(response);
      setWallet(window.aptos);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setWallet(null);
    setCurrentGame(null);
  };

  const showLoading = (message) => {
    setLoadingMessage(message);
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
    setLoadingMessage('');
  };

  return (
    <div className="App">
      <Header />
      <ConnectionStatus 
        account={account}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
      />
      <GameContainer 
        account={account}
        wallet={wallet}
        currentGame={currentGame}
        setCurrentGame={setCurrentGame}
        contractAddress={CONTRACT_ADDRESS}
        moduleName={MODULE_NAME}
        showLoading={showLoading}
        hideLoading={hideLoading}
      />
      <Instructions />
      <Footer />
      <LoadingModal 
        isVisible={loading}
        message={loadingMessage}
      />
    </div>
  );
}

export default App; 