const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../../config/param-validation')
const passport = require('passport')
const devisCtrl = require('./devis.controller')

const router = express.Router() // eslint-disable-line new-cap

router.route('/')
  /** GET /devis - Get© list of devis */
  .get([passport.authenticate('jwt-cookiecombo', { session: false })], devisCtrl.list)

  /** POST /devis - Create new devis */
  .post(validate(paramValidation.create), devisCtrl.create)

module.exports = router
