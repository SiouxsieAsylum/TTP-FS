import React from 'react';

const TransactionAudit = (props) => {
    return(
        <ul>
        props.stocks.map(stock => {
            <li>
                <p>{props.user.name} purchased {props.stocks.quantity} shares of {props.stocks.tickerSymbol}</p>
            </li>
        })
        </ul>
    ) 
}