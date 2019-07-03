const PortfolioController = require('../controllers/portfolioController');
const express = require('express');
const PortfolioRouter = express.Router();

PortfolioRouter.get('/:id', PortfolioController.getFullPortfolio);

module.exports = PortfolioRouter;