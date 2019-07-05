const UserController = require('../controllers/userController');
const express = require('express');
const UserRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');

UserRouter.post('/register', UserController.createUser);

UserRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/user/verify',
  failureRedirect: '/user/verify'
})
);

UserRouter.get('/verify', (req,res) => {
  if (req.user){
     return res.status(200).json(req.user)
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