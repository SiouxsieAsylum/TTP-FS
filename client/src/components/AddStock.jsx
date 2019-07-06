import React from 'react';
import UseStockForm from './StockHooks';

const AddStock = (props) => {
    const {inputs, handleChange, handleSubmit} = UseStockForm(props.purchaseStock);

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="ticker">Ticker</label>
            <input
                onChange={handleChange}
                value={inputs.ticker}
                name="ticker"
                />        
            <label htmlFor="quantity">Quantity</label>
            <input
                type="number"
                onChange={handleChange}
                value={inputs.quantity}
                name="quantity"
                />
            <input type="submit" />
        </form>    
    )
}

export default AddStock;