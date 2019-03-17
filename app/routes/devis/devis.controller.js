const sendEmail = require('../../utils/SendEmail')
const Devis = require('./devis.model')

const create = (req, res, next) => {
  const { email, firstname, lastname, price, detail } = req.body
  const devis = new Devis({
    email,
    firstname,
    lastname,
    price,
    detail
  })
  devis.save()
    .then(() => sendEmail(email, firstname, lastname, price))
    .then(() => res.json())
    .catch(e => next(e))
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
const list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query
  Devis.list({ limit, skip })
    .then(devis => res.json(devis))
    .catch(e => next(e))
}

module.exports = { create, list }
