import React from 'react';
import CustomInput from './CustomInput';
import Submit from './Submit';
import UseStockForm from './StockHooks';

const AddStock = (props) => {
    const {inputs, handleChange, handleSubmit} = UseStockForm(props.purchaseStock);

    return (
        <>
            <h1 className="purchase-header">Purchase New Stock</h1>
            <form 
                className="single-investment column-flex"
                onSubmit={handleSubmit}>
                {/* <section                 
                    className="">  */}
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

                {/* </section> */}



                {/*<label htmlFor="ticker">Ticker</label>
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
                    /> */}
            </form>  
        </>  
    )
}

export default AddStock;