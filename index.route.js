const express = require('express');
const devisRoutes = require('./server/devis/devis.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /devis
router.use('/devis', devisRoutes);

module.exports = router;
