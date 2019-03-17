const Joi = require('joi')

module.exports = {
  // POST /devis
  create: {
    body: {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().required(),
      price: Joi.string().required(),
      detail: Joi.object().required()
    }
  },
  auth: {
    login: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  user: {
    create: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }
}
