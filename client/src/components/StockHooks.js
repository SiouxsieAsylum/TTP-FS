import React, { useState } from "react";

const UseStockForm = (callback) => {
    const [inputs, setInputVal] = useState({});

    const handleChange = (e) => {
        e.persist();
        setInputVal(inputs => ({...inputs, [e.target.name]: e.target.value}))
    };

    const handleSubmit = (e) => {
        e && e.preventDefault();
        let ticker = inputs.ticker;
        let quantity = inputs.quantity;
        let fullPurchase = {ticker, quantity};

        callback(fullPurchase);
    };

    return {
        inputs,
        handleChange,
        handleSubmit
    }
}

module.exports = UseStockForm;