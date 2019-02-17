const mongoose = require('mongoose');

/**
 * User Schema
 */
const DevisSchema = new mongoose.Schema({
  lastname: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  detail: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * @typedef Devis
 */
module.exports = mongoose.model('Devis', DevisSchema);
