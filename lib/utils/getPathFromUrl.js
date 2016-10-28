function getPathFromUrl (url) {
  return url.split(/[?#]/)[0]
}

module.exports = getPathFromUrl
