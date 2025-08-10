import React, { useState, useEffect } from 'react';
import './ConnectionStatus.css';

const ConnectionStatus = ({ account, onConnect, onDisconnect }) => {
  const [balance, setBalance] = useState('-');

  useEffect(() => {
    if (account) {
      fetchBalance();
    }
  }, [account]);

  const fetchBalance = async () => {
    try {
      if (window.aptos && account) {
        const balance = await window.aptos.getBalance({ accountAddress: account.address });
        const aptBalance = (parseInt(balance.coin.value) / Math.pow(10, 8)).toFixed(4);
        setBalance(aptBalance);
      }
    } catch (error) {
      console.error('Failed to get balance:', error);
    }
  };

  const formatAddress = (address) => {
    if (!address) return '-';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="connection-status">
      <div className="status-info">
        <div className="status-indicator">
          <i className={`fas fa-circle ${account ? 'connected' : ''}`}></i>
          <span className="status-text">
            {account ? 'Connected' : 'Not Connected'}
          </span>
        </div>
        {account && (
          <div className="account-details">
            <p>Address: {formatAddress(account.address)}</p>
            <p>Balance: {balance} APT</p>
          </div>
        )}
      </div>
      <button 
        className={`connect-btn ${account ? 'disconnect' : ''}`}
        onClick={account ? onDisconnect : onConnect}
      >
        {account ? 'Disconnect Wallet' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default ConnectionStatus; 