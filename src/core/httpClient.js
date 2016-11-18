import config from '../constants/config'
import _ from 'lodash'

function handleErrors (response) {
  if (response.ok) {
    return response
  }

  return Promise.reject(response)
}

export function get (route) {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }

  return fetch(`${config.BASE_URL}${route}`, options)
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => Promise.reject(error))
}

export function getExternal (route) {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }

  return fetch(route, options)
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => Promise.reject(error))
}

export function post (route, payload) {
  let options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  }

  if (localStorage.token) {
    options = _.merge({}, options, {
      headers: _.merge(options.headers, {
        'Authorization': `Bearer ${localStorage.token}`
      })
    })
  }

  return fetch(`${config.BASE_URL}${route}`, options)
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => Promise.reject(error))
}

export function put (route, data) {
  let options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(data)
  }

  if (localStorage.token) {
    options = _.merge({}, options, {
      headers: _.merge(options.headers, {
        'Authorization': `Bearer ${localStorage.token}`
      })
    })
  }

  return fetch(`${config.BASE_URL}${route}`, options)
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => Promise.reject(error))
}

export function remove (route, data) {
  let options = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
    body: JSON.stringify(data)
  }

  if (localStorage.token) {
    options = _.merge({}, options, {
      headers: _.merge(options.headers, {
        'Authorization': `Bearer ${localStorage.token}`
      })
    })
  }

  return fetch(`${config.BASE_URL}${route}`, options)
    .then(handleErrors)
    .then(response => response.json())
    .catch(error => Promise.reject(error))
}


export default {
  remove,
  get,
  post,
  put,
  getExternal
}
