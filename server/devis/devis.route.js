const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const devisCtrl = require('./devis.controller');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/')
  .post(validate(paramValidation.createDevis), devisCtrl.createDevis);

module.exports = router;
