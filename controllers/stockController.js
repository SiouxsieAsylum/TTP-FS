const Stock = require('../models/Stock');
const StockController = {};

StockController.addStockToPortfolio = (req, res, next) => {
    Stock.create({
        tickerSymbol: req.body.ticker,
        buyingPrice: req.body.buyingPrice,
        portfolioId: req.body.portfolioId,
        datePurchased: req.body.datePurchased
    })
    .then(stock =>{
        res.send(stock)
    })
    .catch(err => console.log(error))

}

export default StockController;