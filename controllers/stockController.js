const Stock = require('../models/Stock');
const User = require('../models/User');
const StockController = {};

StockController.addStockToPortfolio = (req, res, next) => {
    Promise.all([
        Stock.create({
            tickerSymbol: req.body.ticker,
            buyingPrice: req.body.buyingPrice,
            portfolioId: req.body.portfolioId,
            datePurchased: req.body.datePurchased,
            quantity: req.body.quantity
        }),
        User.updateBalance({
            userId: req.user.id,
            balance: req.body.balance
        })
    ]).then(allData =>{
        res.json(allData)
    })
    .catch(err => console.log(error))
}

StockController.getAllTrades = (req, res, next) => {
    Promise.all([
        Stock.getAllUserStocks(req.user.id),
    ]).then(allData =>{
        res.json(allData)
    })
    .catch(err => console.log(error))
}

module.exports = StockController;