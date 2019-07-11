const StockController = require('../controllers/stockController');
const express = require('express');
const StockRouter = express.Router();

StockRouter.post('/new', StockController.addStockToPortfolio);

StockRouter.get('/all-trades/:userid', StockController.getAllTrades);

module.exports = StockRouter;