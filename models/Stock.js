const db = require('../db/dbConfig');
const Stock = {};

Stock.create = stock => {
    return db.one(`INSERT INTO stocks () values () RETURNING *`, [stock.tickerSymbol, stock.buyingPrice ,stock.portfolioId, stock.dateCreated, stock.quantity])
}

export default Stock;