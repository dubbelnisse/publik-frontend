const { createDecipher, createCipher } = require('crypto')
const ciper = 'aes-256-cbc'

function now () {
  return new Date().toISOString().split('T')[0]
}

function getCookie (req) {
  const { headers: { cookie = '' } } = req
  return cookie.split('; ')
    .reduce((object, part) => {
      if (part === undefined) {
        return object
      }
      const [ key, ...values ] = part.split('=')
      object[key] = values.join('=')
      return object
    }, {})
}

function createToken ({ access_token, token_type, roles }) {
  return toHash(`${token_type}.${access_token}.${roles.join(',')}`)
}

function toHash (token) {
  try {
    const encrypt = createCipher(ciper, now())
    const msg = [ encrypt.update(token, 'utf8', 'base64') ]
    msg.push(encrypt.final('base64'))
    return msg.join('')
  } catch (_) {
    return ''
  }
}

function toReadable (token) {
  try {
    const decrypt = createDecipher(ciper, now())
    const msg = [ decrypt.update(token, 'base64', 'utf8') ]
    msg.push(decrypt.final('utf8'))
    const [ token_type, access_token, roles ] = msg.join('').split('.')
    return {
      token_type,
      access_token,
      roles: roles.split(',')
    }
  } catch (_) {
    return {
      token_type: '',
      access_token: '',
      roles: []
    }
  }
}

function isAdmin ({ auth, req }) {
  return isInRole(auth, req, 'admin')
}

function isTeamleader ({ auth, req }) {
  return isInRole(auth, req, 'teamleader')
}

function isInRole (auth, req, role) {
  const cookie = auth || getCookie(req).auth
  if (!cookie) {
    return false
  }
  const { roles } = toReadable(cookie)
  return !!roles.find(r => r === role)
}

function parseToken (req) {
  const { auth } = getCookie(req)
  if (!auth) {
    return ''
  }

  const { token_type, access_token } = toReadable(auth)

  if (!token_type || !access_token) {
    return ''
  }

  return `${token_type} ${access_token}`
}


module.exports = {
  createToken,
  parseToken,
  isAdmin,
  isTeamleader,
  isInRole
}
