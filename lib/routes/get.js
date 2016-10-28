const fetch = require('node-fetch')
const getPathFromUrl = require('../utils/getPathFromUrl')
const nconf = require('nconf').env('__').file({
  file: 'config.json'
})

function get (req, res) {
  const host = nconf.get('host')

  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${req.query.token}`
    }
  }

  fetch(`${host}${getPathFromUrl(req.url)}`, options)
    .then(response => response.json())
    .then(response => res.send(response))
    .catch(error => console.log(error))
}

module.exports = get
