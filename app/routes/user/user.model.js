const Promise = require('bluebird');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const httpStatus = require('http-status');

const APIError = require('../../utils/APIError');
const config = require('../../config/config');
/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
UserSchema.pre('save', function(next) { // eslint-disable-line prefer-arrow-callback
  try {
    const hash = crypto.createHash('sha256');
    hash.update(this.password)
    this.password = hash.digest('hex')
    next();
  } catch (err) { next(err); }
});

/**
 * Methods
 */
UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.createHash('sha256');
  hash.update(password)
  return this.password === hash.digest('hex')
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({
    email: this.email,
    id: this._id,
  }, config.jwt.secret, config.jwt.options);
}

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};
/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  getByAuth(email, password) {
    return this.findOne({ email })
      .exec()
      .then((user) => {
        if (user && user.validatePassword(password)) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND)
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
