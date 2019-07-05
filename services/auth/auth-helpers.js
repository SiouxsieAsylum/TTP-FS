const bcrypt = require('bcryptjs');
const User = require('../../models/User');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function displayInfo(req,res,next){
  console.log(req.body);
  User.findByEmail(req.body.email)
  .then(user => {
    res.json({user})
  })
  .catch(next)

}

function loginRedirect(req,res,next){
  if (req.user) return res.redirect('/user');
  next();
}

function loginRequired(req,res,next){
  if(!req.user) return res.redirect('/auth/login')
  next();
}

module.exports = {
  comparePass,displayInfo,loginRedirect
}
