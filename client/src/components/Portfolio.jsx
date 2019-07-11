import React from 'react';
import AddStock from './AddStock';

const uuidv4 = require('uuid')

const IndividualStock = (props) => {
    let totalInvestment = props.stock.buyingprice * props.stock.quantity;
    let hasChanged = props.stock.buyingprice !== props.currentPrice;

    return (
        <div className="single-investment">
            <p className="ticker-symbol">{props.stock.tickersymbol}</p>
            <p>{props.stock.quantity} Shares</p>
            <p>{props.stock.buyingprice}</p>
            <p>{props.currentPrice}</p>
            {hasChanged &&  <p className={props.stock.buyingprice < props.currentPrice ? 'red' : 'green'}>{totalInvestment}</p>}
            {!hasChanged && <p>{totalInvestment}</p>}
        </div>
    )
}

const Portfolio = (props) => {
    return (
        <main className="flex-container">  
            <div>
                <div className="single-investment">
                    <p className="green-header ticker-symbol">Ticker Symbol</p>
                    <p className="green-header ticker-symbol">Quantity</p>
                    <p className="green-header ticker-symbol">Price per Share At Purchase</p>
                    <p className="green-header ticker-symbol">Current Market Price</p>
                    <p className="green-header ticker-symbol">Total</p>
                </div>
                <div className="scroll-container">
                    { props.stocks.length && props.stocks.map((stock, i) =>{
                        return <IndividualStock 
                                key={uuidv4()}
                                stock={stock} 
                                currentPrice={props.currentPrices[stock.tickersymbol.toUpperCase()]} />
                    }) }
                </div>
            </div>
            <div>
                <AddStock 
                    user={props.user} 
                    purchaseStock={props.purchaseStock} 
                    purchaseFailed={props.purchaseFailed}
                    />
            </div>
        </main>
    )
}

export default Portfolio;


