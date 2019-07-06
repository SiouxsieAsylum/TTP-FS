const Portfolio = require('../models/Portfolio');
const PortfolioController = {};

PortfolioController.create = (req,res) => {
    Portfolio.create({
        userId: req.user.id,
        name: req.body.name
    })
    .then(portfolio => {
        return portfolio;
    })
    .catch(err => {
        console.log(err);
    })
}

PortfolioController.getFullPortfolio = (req,res) => {
    Portfolio.getPortfolioStocks({
        id: req.params.id
    })
    .then(portfolio => {
        res.json(portfolio)
    })
    .catch(err => console.log(err))
}

module.exports = PortfolioController;