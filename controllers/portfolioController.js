const Portfolio = require('../models/Portfolio');
const PortfolioController = {};

PortfolioController.create = (req,res,next) => {
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
    //create portfolio
}

PortfolioController.getFullPortfolio = (req,res,next) => {
    //get all stocks for the current Portfolio
    //should work for both transactions view and default port view 
}

export default PortfolioController;