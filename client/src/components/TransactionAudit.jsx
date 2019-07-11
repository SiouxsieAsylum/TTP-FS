import React from 'react';
const uuidv4 = require('uuid')


const TransactionAudit = (props) => {
    return(
        <>
        <h1>Full Audit</h1>
        <t className="transaction-list">
            <tr className="transaction-header">
                <th colSpan="3">{props.user}'s Transactions</th>
            </tr>
            <tr className="transaction-header">
                <th>Date Purchased</th>
                <th>Ticker Symbol</th>
                <th>Quantity</th>
            </tr>
            {  
                props.stocks.map(stock => {
                    return (<tr
                            key={uuidv4()}>
                                <td>{stock.datepurchased}</td>
                                <td>{stock.tickersymbol}</td>
                                <td>{stock.quantity}</td>
                            </tr>)
                    }) 
            }
        </t>
        </>
    ) 
}
export default TransactionAudit;
