import React from 'react';
const uuidv4 = require('uuid')


const TransactionAudit = (props) => {
    return(
        <ul className="transaction-list">
        {   props.stocks.map(stock => {
            return <li
                key={uuidv4()}>
                <p><span>{stock.datepurchased}</span>{props.user.name} purchased {stock.quantity} shares of {stock.tickersymbol.toUpperCase()}</p>
            </li>
        })  }
        </ul>
    ) 
}

export default TransactionAudit;