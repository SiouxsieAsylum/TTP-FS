const db = require('../db/dbConfig');
const Portfolio = {};

Portfolio.create = portfolio => {
    return db.one(`INSERT INTO portfolios (userId, name, isDefault) VALUES ($1, $2, $3) RETURNING *`, [portfolio.userId, portfolio.name, portfolio.isDefault])
}

Portfolio.getDefaultPortfolio = userId => {
    return db.one(`SELECT * FROM portfolios WHERE userId = $1 AND isDefault = true`, [userId])
}

Portfolio.getPortfolioStocks = portfolio => {
    return db.any(`Select stocks.* FROM stocks JOIN portfolios ON portfolios.portfolioid = stocks.portfolioid where portfolios.portfolioid = $1`, [portfolio.id])
}

module.exports = Portfolio;