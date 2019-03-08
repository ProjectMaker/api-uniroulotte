const httpStatus = require('http-status');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local')
const config = require('./config');
const JwtCookieComboStrategy = require('passport-jwt-cookiecombo');

const APIError = require('../server/helpers/APIError');

const LocalStrategy = passportLocal.Strategy;
const User = mongoose.model('User');

passport.use(new JwtCookieComboStrategy({
  secretOrPublicKey: config.jwt.secret,
  jwtVerifyOptions: config.jwt.options,
  passReqToCallback: false
}, (payload, done) => {
  return done(null, payload, {});
}));

passport.use('signin-local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, (email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, new APIError('User not found', httpStatus.NOT_FOUND));
      }

      return done(null, user);
    }).catch(done);
}));

module.exports = passport
