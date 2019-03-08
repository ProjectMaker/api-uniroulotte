const passport = require('passport')
const httpStatus = require('http-status');

const config = require('../../config/config')
const APIError = require('../helpers/APIError');
const User = require('./user.model');

/**
 * Load user and append to req.
 */
function login(req, res, next) {
  return passport.authenticate('signin-local', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (user) {
      const token = user.generateJWT()
      res.cookie('jwt', token, config.jwt.cookie);
      return res.json({ token });
    }
    next(new APIError('No such user exists!', httpStatus.NOT_FOUND))
  })(req, res, next);
}

/**
 * Create new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The pasword of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  user.save()
    .then(savedUser => res.json(savedUser.toAuthJSON()))
    .catch(e => next(e));
}

module.exports = { login, create };
