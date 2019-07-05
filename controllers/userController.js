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
        let defaultPortfolio = {
            userId: user.userid,
            name: `${user.name}'s Default Portfolio`
        }
        return Portfolio.create(defaultPortfolio);
    })

    Promise.all([userPromise, portfolioPromise])
    .then(([user, portfolio]) => {
        res.json({user, portfolio})
    })
    .catch(err => {
        console.log(err);
    })
}

UserController.updateBalance = (req, res, next) => {
    User.updateBalance({
        balance: req.body.balance,
        userId: req.user.id
    })
    .then(user => {
        res.send(user)
    })
    .catch(err => console.log(err))
}

module.exports = UserController;