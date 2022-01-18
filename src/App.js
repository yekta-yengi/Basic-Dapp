import React,{useState} from 'react';
import {ethers} from 'ethers'
import './App.css';
import WalletCard from './Components/WalletCard/WalletCard'


function App() {

  const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connectionButtonText, setConnectionButtonText] = useState('Connect Wallet');
  const [showWalletCard, setShowWalletCard] = useState(false)

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
    console.log('MetaMask is loaded!');

    window.ethereum.request({ method: 'eth_requestAccounts'})
    .then(result => {
      accountChangedHandler(result[0]);
      setConnectionButtonText('Wallet Connected');
      setShowWalletCard(1);
    })
    .catch(error => {
      setErrorMessage(error.message);
    });

    }else {
    console.log('Need to install MetaMask');
    setErrorMessage('Please install MetaMask browser extension to interact');
    }
	}

  // update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
      console.log(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);



  return (
    <div className="App">
      <button className='connectBtn' onClick={connectWalletHandler}>{connectionButtonText}</button>
      {showWalletCard && <WalletCard balance={userBalance} accountAddress={defaultAccount} errorMessage={errorMessage}/>}
    </div>
  );
}

export default App;
