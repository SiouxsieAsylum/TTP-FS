const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
const bcrypt = require('bcryptjs');
const UserController = {};

UserController.createUser = (req, res, next) => {
    User.findByEmail(req.body.email)
    .then(user => {
        if (user) {
            res.status(400).send({userExists: true})
        } else {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(req.body.password, salt);
            const sessionObj = authHelpers.generateToken()
            const userPromise = User.create({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                balance: process.env.INITIAL_BALANCE,
                sessionToken: sessionObj.sessionToken,
                sessionExpiry: sessionObj.sesssionExpiry
            })
        
            const portfolioPromise = userPromise.then(user => {
                let defaultPortfolio = {
                    userId: user.userid,
                    name: `${user.name}'s Default Portfolio`,
                    isDefault: true
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
    })
    .catch(err => {
        console.log(err)
    })

}

UserController.getUserBySession = (req, res) => {
    User.findBySession(req.params.token)
    .then(user => {
        res.json(user)
    })
    .catch(err => console.log(err))
}

UserController.updateBalance = (req, res) => {
    User.updateBalance({
        balance: req.body.balance,
        userId: req.user.userid
    })
    .then(user => {
        res.json(user)
    })
    .catch(err => console.log(err))
}

UserController.handleLogout = (req, res) => {
    User.removeSessionToken(req.user.id)
    .then(_ => {
        req.logout();
        res.send('loggedout')
    })
    .catch(err => {
        console.log(err);
    })
};

module.exports = UserController;