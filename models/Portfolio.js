const db = require('../db/dbConfig');
const Portfolio = {};

//allows for the option to CRUD multiple portfolios in the future
Portfolio.create = portfolio => {
    return db.one(`INSERT INTO portfolios (userId, name) VALUES ($1, $2) RETURNING *`, [portfolio.userId, portfolio.name])
}

export default Portfolio;