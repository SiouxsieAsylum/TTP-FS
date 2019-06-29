const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const User = require('../../models/User');
const authHelpers = require('./auth-helpers');

const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    User.findByEmail(username)
    .then(user => {
      console.log(user)
      if (!user) {
        console.log("not in database")
        return done(null, false);
      }
      if (!authHelpers.comparePass(password, user.password_digest)) {
        console.log("passwords don't match")
        return done(null, false);
      } else {
        return done(null, user);
      }
    }).catch(err => {
      console.log(err);
      return done(err);
    });
  })
);


module.exports = passport;
