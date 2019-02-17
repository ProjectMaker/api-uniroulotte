const mailjet = require('node-mailjet');
const config = require('../../config/config');

const getMessage = (to, firstname, lastname, price) => [
  {
    From: {
      Email: 'devis@uni-roulotte.fr',
      Name: 'Uni-roulotte'
    },
    To: [
      {
        Email: to,
        Name: `${lastname} ${firstname}`
      }
    ],
    TemplateID: config.mailjet.templateDevis,
    TemplateLanguage: true,
    Subject: 'Votre devis',
    Variables: {
      PRICE: price
    }
  }
];

const sendEmail = (to, firstname, lastname, price) => {
  const client = mailjet.connect(config.mailjet.keyPublic, config.mailjet.keySecret);
  return client
    .post('send', { version: 'v3.1' })
    .request({
      Messages: getMessage(to, firstname, lastname, price)
    });
};

module.exports = sendEmail;
