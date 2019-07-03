const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const bcrypt = require('bcryptjs');
const UserController = {};

UserController.createUser = (req, res, next) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    const userPromise = User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
        balance: process.env.INITIAL_BALANCE
    })

    const portfolioPromise = userPromise.then(user => {
        console.log(user)
        let defaultPortfolio = {
            userId: user.userid,
            name: `${user.name}'s Default Portfolio`
        }
        return Portfolio.create(defaultPortfolio);
    })

    Promise.all([userPromise, portfolioPromise])
    .then(([user, portfolio]) => {
        res.send(`${user.name} is logged in, displaying ${portfolio.name}, under user ${portfolio.userId}`)
    })
    .catch(err => {
        console.log(err);
    })
}

UserController.updateBalance = (req, res, next) => {
    //update user balance 
}

module.exports = UserController;