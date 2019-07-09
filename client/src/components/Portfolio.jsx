import React from 'react';
import AddStock from './AddStock';

const uuidv4 = require('uuid')

const IndividualStock = (props) => {
    let totalInvestment = props.stock.buyingprice * props.stock.quantity;
    return (
        <div>
            <p>{props.stock.tickersymbol}</p>
            <p>{props.stock.quantity} Shares</p>
            <p className={props.stock.buyingprice < props.currentPrice ? 'red' : 'green'}>{totalInvestment}</p>
        </div>
    )
}

const Portfolio = (props) => {
    return (
        <>
            <div>
                { props.stocks.length && props.stocks.map((stock, i) =>{
                    return <IndividualStock 
                            key={uuidv4()}
                            stock={stock} 
                            currentPrice={props.currentPrices[stock.tickersymbol.toUpperCase()]} />
                }) }
            </div>
            <div>
                <AddStock 
                    user={props.user} 
                    purchaseStock={props.purchaseStock} />
            </div>
        </>
    )
}

export default Portfolio;


