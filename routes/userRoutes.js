const UserController = require('../controllers/userController');
const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
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
      const sessionObj = authHelpers.generateToken();
      sessionObj.userId = req.user.userid;
      Promise.all([
        User.setNewSessionToken(sessionObj),
        Portfolio.getDefaultPortfolio(req.user.userid)
      ])
      .then(allData => {
        let fullReturn = {
          user: allData[0],
          portfolio: allData[1]
        }
        return res.status(200).json(fullReturn)
      })
      .catch(err => console.log(err))
   }else{
      return res.status(400).send('Login failed')
   }
});

UserRouter.put('/purchase', UserController.updateBalance)

UserRouter.get('/logout/:id', UserController.handleLogout);

UserRouter.get('/session/:token', UserController.getUserBySession);



module.exports = UserRouter;