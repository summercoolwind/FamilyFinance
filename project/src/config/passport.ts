const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    function (username, password, done) {
      User.findOne({ name: username }, (err, userInfo) => {
        if (userInfo.password !== password) {
          return done(null, false);
        }
        done(null, userInfo);
      });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((userId, done) => {
    User.findOne({_id : userId}, (err, user) => {
      done(null, user);
    });
  });
}

