const nconf = require('nconf')
  .env({ separator: '__', lowerCase: true })
  .file({ file: 'config.json', dir: '../', search: true })
  .defaults({
    port: 4000,
    api: {
      url: 'http://publik-api.nilssonnils.se'
    }
  })

module.exports = {
  port: nconf.get('port'),
  api: nconf.get('api')
}
