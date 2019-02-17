const sendEmail = require('../helpers/SendEmail');
const Devis = require('./devis.model');

const createDevis = (req, res, next) => {
  const { email, firstname, lastname, price, detail } = req.body;
  const devis = new Devis({
    email,
    firstname,
    lastname,
    price,
    detail
  });
  devis.save()
    .then(() => sendEmail(email, firstname, lastname, price))
    .then(() => res.json())
    .catch(e => next(e));
};

module.exports = { createDevis };
