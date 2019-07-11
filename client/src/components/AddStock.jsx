import React from 'react';
import CustomInput from './CustomInput';
import Submit from './Submit';
import UseStockForm from './StockHooks';

const AddStock = (props) => {
    const {inputs, handleChange, handleSubmit} = UseStockForm(props.purchaseStock);

    return (
        <>
            <h1 className="purchase-header">Purchase New Stock</h1>
            {props.purchaseFailed && <h2 className="purchase-header warning">WARNING: {props.purchaseFailed}</h2> }

            <form 
                className="single-investment column-flex"
                onSubmit={handleSubmit}>
                    <div className="column-flex">
                    <CustomInput 
                        name="ticker"
                        label="Ticker Symbol"
                        changeHandler={handleChange}
                        inputs={inputs}
                        />
                    </div>               
                    <div className="column-flex">
                        <CustomInput 
                            name="quantity"
                            type="number"
                            label="Quantity"
                            changeHandler={handleChange}
                            inputs={inputs}
                            />
                    </div>

                    <Submit />
            </form>
        </>  
    )
}

export default AddStock;