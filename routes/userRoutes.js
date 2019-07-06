const UserController = require('../controllers/userController');
const Portfolio = require('../models/Portfolio')
const express = require('express');
const UserRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');

UserRouter.post('/register', UserController.createUser);

UserRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/api/user/verify',
  failureRedirect: '/api/user/verify'
})
);

UserRouter.get('/verify', (req,res) => {
  if (req.user){
      Portfolio.getDefaultPortfolio(req.user.userid)
      .then(portfolio => {
        let fullReturn = {
          user: req.user,
          portfolio
        }
        return res.status(200).json(fullReturn)
      })
      .catch(err => console.log(err))
   }else{
      return res.status(400).send('Login failed')
   }
});

UserRouter.post('/purchase', UserController.updateBalance)

UserRouter.get('/logout', (req, res) => {
  req.logout();
  res.send('loggedout')
});


module.exports = UserRouter;