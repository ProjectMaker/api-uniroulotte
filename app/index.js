const mongoose = require('mongoose')

// config should be imported before importing any other file
const config = require('./config/config')
const app = require('./config/express')

// make bluebird default Promise
Promise = require('bluebird') // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise

// connect to mongo db
const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}
const connectWithRetry = () => {
  mongoose.connect(config.mongo.host, options)
    .then(() => {
      console.log('MongoDB is connected') // eslint-disable-line no-console
    })
    .catch(() => {
      console.log('MongoDB connection unsuccessful, retry after 5 seconds.')  // eslint-disable-line no-console
      setTimeout(connectWithRetry, 5000)
    })
}
connectWithRetry()

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => { // eslint-disable-line no-unused-vars
    // console.log(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`) // eslint-disable-line no-console
  })
}

module.exports = app
