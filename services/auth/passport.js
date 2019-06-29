const passport = require('passport');
const User = require('../../models/User');

module.exports = () => {
  passport.serializeUser((user, done) => {
  // console.log("serialize=",user)
  done(null, user.email);
  });



passport.deserializeUser((email, done) => {
      User.findByEmail(email)
      .then(user => {
        // console.log("deserialize=",user)
      done(null, user);
      }).catch (err => {
        done(err, null);
    });
  });
}
