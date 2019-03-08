const express = require('express');
const validate = require('express-validation');
const passport = require('passport')
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post([
    passport.authenticate('jwt-cookiecombo', { session: false }),
    validate(paramValidation.user.create)
  ], userCtrl.create);
router.route('/login')
  .post(userCtrl.login)
module.exports = router;
