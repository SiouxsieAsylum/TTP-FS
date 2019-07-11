const Stock = require('../models/Stock');
const StockController = {};

StockController.addStockToPortfolio = (req, res) => {
    Stock.create({
        tickerSymbol: req.body.tickerSymbol,
        buyingPrice: req.body.buyingPrice,
        portfolioId: req.body.portfolioId,
        datePurchased: req.body.datePurchased,
        quantity: req.body.quantity
    }).then(allData =>{
        res.json(allData)
    })
    .catch(err => console.log(err))
}

StockController.getAllTrades = (req, res, next) => {
    Stock.getAllUserStocks(req.user.userid)
    .then(allData =>{
        res.json(allData)
    })
    .catch(err => console.log(error))
}

module.exports = StockController;