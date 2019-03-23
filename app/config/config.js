/* eslint-disable global-require */
const Joi = require('joi')
const dotenv = require('dotenv')

// require and configure dotenv, will load vars in .env in PROCESS.ENV
dotenv.config({ debug: true, path: '/app/shared/.env' })

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  ACCEPT_ORIGIN: Joi.string().required()
    .description('Cors accept origin'),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.number()
    .default(27017),
  MAILJET_KEY_PUBLIC: Joi.string().required(),
  MAILJET_KEY_SECRET: Joi.string().required(),
  MAILJET_TEMPLATE_DEVIS: Joi.number().required()
}).unknown()
  .required()

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  acceptOrigin: envVars.ACCEPT_ORIGIN,
  jwtSecret: envVars.JWT_SECRET,
  jwt: {
    secret: envVars.JWT_SECRET,
    options: {
      expiresIn: '1y'
    },
    cookie: {
      httpOnly: true,
      sameSite: true,
      signed: true
    }
  },
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT
  },
  mailjet: {
    keyPublic: envVars.MAILJET_KEY_PUBLIC,
    keySecret: envVars.MAILJET_KEY_SECRET,
    templateDevis: envVars.MAILJET_TEMPLATE_DEVIS
  }
}

module.exports = config
