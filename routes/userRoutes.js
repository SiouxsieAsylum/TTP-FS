const UserController = require('../controllers/userController');
const express = require('express');
const UserRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');

UserRouter.post('/register', UserController.createUser);

UserRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/api/auth/verify',
  failureRedirect: '/api/auth/verify',
  failureFlash: true
})
);

UserRouter.get('/verify', (req, res) => {
  if (req.user){
     return res.status(200).send(`${req.user.name} is logged in`)
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