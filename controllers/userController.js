const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const bcrypt = require('bcryptjs');
const UserController = {};

UserController.createUser = (req, res, next) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    User.create({
        email: req.body.email,
        password: hash,
        name: req.body.fullName,
        balance: process.env.INITIAL_BALANCE
    })
    .then(user=> {
        Portfolio.create(user.id, `${user.name}'s Default Portfolio`);
    })
    .then(portfolio => {
        res.send(`${user.name} has a portfolio called ${portfolio.name}`)
    })
    .catch(err => {
        console.log(err);
    })
    //create user
    //create portfolio with user id 
    //login user
}

UserController.updateBalance = (req, res, next) => {
    //update user balance 
}

export default UserController;