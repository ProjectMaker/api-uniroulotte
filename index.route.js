const express = require('express');
const devisRoutes = require('./server/devis/devis.route');
const userRoutes = require('./server/user/user.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/devis', devisRoutes);
router.use('/account', userRoutes);

module.exports = router;
