const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
// 认证中间件
module.exports = function (passport) {
  passport.use(new LocalStrategy(
    function (username, password, done) {
      User.findOne({ name: username }, (err, userInfo) => {
        if (userInfo === null) { 
          return done(null, false);
        }
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

