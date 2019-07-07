const bcrypt = require('bcryptjs');
const uuidV4 = require('uuid/v4')
const User = require('../../models/User');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function generateToken(){
  let sessionTokenObj = {};
  let today = new Date();
  let tomorrow = today.setDate(today.getDate() + 1);

  sessionTokenObj.sessionToken = uuidV4();
  sessionTokenObj.sessionExpiry = new Date(tomorrow).toISOString();

  return sessionTokenObj;
}

function displayInfo(req,res,next){
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
  comparePass,displayInfo,loginRedirect, generateToken
}
