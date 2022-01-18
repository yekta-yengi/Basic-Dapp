import React from 'react'
import './walletcard.css'

function WalletCard( {accountAddress, balance, errorMessage }) {

    return (
        <div className='walletCard'>
		<h4> {"Your account details:"} </h4>
			<div className='accountDisplay'>
				<h3>Account Address: {accountAddress}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {balance} ETH</h3>
			</div>
			{errorMessage}
		</div>
    )
}

export default WalletCard
