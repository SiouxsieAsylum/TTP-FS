const db = require('../db/dbConfig');
const Portfolio = {};

Portfolio.create = portfolio => {
    return db.one(`INSERT INTO portfolios (userId, name) VALUES ($1, $2) RETURNING *`, [portfolio.userId, portfolio.name])
}

Portfolio.getPortfolioStocks = portfolio => {
    return db.oneOrMany(`Select * FROM portfolios JOIN stocks ON portfolios.portfolioId = stocks.portfolioid where portfolio.portfolioid = $1`, [portfolio.id])
}

module.exports = Portfolio;