import React from 'react';
const uuidv4 = require('uuid')


const TransactionAudit = (props) => {
    return(
        <>
        <h1 className="green-header large-header">{props.user.name}'s Transactions</h1>
        <table className="transaction-list">
            <tbody>
            <tr className="green-header">
                <th>Date Purchased</th>
                <th>Ticker Symbol</th>
                <th>Quantity</th>

            </tr>
            {  
                props.stocks.map(stock => {
                    return (<tr
                            key={uuidv4()}>
                                <td>{stock.datepurchased.slice(0, stock.datepurchased.indexOf("T"))}</td>
                                <td>{stock.tickersymbol}</td>
                                <td>{stock.quantity}</td>
                            </tr>)
                    }) 
            }
            </tbody>
        </table>
        </>
    ) 
}
export default TransactionAudit;
