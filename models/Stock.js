const db = require('../db/dbConfig');
const Stock = {};

Stock.create = stock => {
    return db.one(`INSERT INTO stocks (tickerSymbol, buyingPrice, portfolioId, datePurchased, quantity) values ($1, $2, $3, $4, $5) RETURNING *`, [stock.tickerSymbol, stock.buyingPrice ,stock.portfolioId, stock.datePurchased, stock.quantity])
}

Stock.getAllUserStocks = userId => {
    return db.any(`SELECT stocks.*, portfolios.name FROM stocks JOIN portfolios ON stocks.portfolioId = portfolios.portfolioId JOIN users ON portfolios.userId = users.userId where users.userId = $1 ORDER BY datePurchased DESC`, [userId])
}

module.exports = Stock;