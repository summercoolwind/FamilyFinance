const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(new LocalStrategy(
   function (username, password, done) {
      User.findOne({ name: username }).then((userInfo) => {
        if (userInfo.password !== password) {
          console.log("validate fail");
          return done(null, false);
        }
        done(null, userInfo);
      }).catch(err => {
        console.log("err    ====" + err);
        return done(null, false);
      });
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((user, done) => {
    User.findOne(user => done(null, user));
  });
}

