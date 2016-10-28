const { parseToken } = require('../helpers/token')
const { isAdmin } = require('../helpers/token')

function getAuth (req) {
  const auth = parseToken(req)

  const split = `${auth}`.split(' ')
  if (!auth || split.length < 2 || split[0].toLowerCase() !== 'bearer') {
    return ''
  }

  return auth
}

function verified (req, res, next) {
  const auth = getAuth(req)
  if (!auth) {
    res.status(403).redirect('/admin/login')
    return
  }

  req.token = auth

  next()
}

function verifiedAsAdmin (req, res, next) {
  if (!isAdmin({ req })) {
    res.status(403).redirect('/admin')
    return
  }

  next()
}

module.exports = {
  verified,
  verifiedAsAdmin
}
