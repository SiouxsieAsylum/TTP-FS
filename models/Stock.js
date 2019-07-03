const db = require('../db/dbConfig');
const Stock = {};

Stock.create = stock => {
    return db.one(`INSERT INTO stocks (tickerSymbol, buyinhPrice, portfolioId, datePurchased, quantity) values ($1, $2, $3, $4 $5) RETURNING *`, [stock.tickerSymbol, stock.buyingPrice ,stock.portfolioId, stock.datePurchased, stock.quantity])
}

module.exports = Stock;