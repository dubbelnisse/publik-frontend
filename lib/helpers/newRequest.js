const { api } = require('../helpers/config')
const url = require('url').parse(api.url)

const request = (() =>
  url.protocol.match(/https/) !== null
    ? require('https').request
    : require('http').request
)()

function pipeRequest (options, filename, res) {
  request(Object.assign({}, url, options), response => {
    const { statusCode } = response
    const ok = statusCode >= 200 && statusCode < 300
    if (!ok) {
      return res.setHeaders(statusCode).redirect('/admin/login')
    }
    res.setHeader('content-type', response.headers['content-type'])
    res.setHeader('content-disposition', `attachment; filename=${filename}`)
    response.pipe(res)
  })
  .end()
}

function newRequest (options, data) {
  const headers = Object.assign({}, url, options)
  return new Promise((resolve, reject) => {
    const httpRequest = request(headers, response => {
      const ok = response.statusCode >= 200 && response.statusCode < 300
      if (!ok) {
        return reject(403)
      }
      let result = ''
      response.on('data', chunk => {
        result += chunk
      })
      response.on('end', () => resolve(JSON.parse(result)))
    })
    httpRequest.on('error', error => console.error(error) || reject(403))
    httpRequest.write(JSON.stringify(data))
    httpRequest.end()
  })
}

module.exports = {
  newRequest,
  pipeRequest
}
