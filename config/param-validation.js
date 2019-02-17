const Joi = require('joi');

module.exports = {
  // POST /devis
  createDevis: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required(),
      price: Joi.string().required(),
      detail: Joi.object().required()
    }
  },
};
