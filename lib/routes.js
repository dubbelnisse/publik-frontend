const get = require('./routes/get')

function register (app) {
  app.get('/get', get)
}

module.exports = {
  register
}
