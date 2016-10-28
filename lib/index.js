const { join } = require('path')
const express = require('express')
const app = express()
const routes = require('./routes')
const { urlencoded, json } = require('body-parser')
const { port } = require('./helpers/config')

app.use(json())
app.use(urlencoded({ extended: true }))

app.set('view engine', 'hbs')

// Different middleware for serving the react files if running production or development
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const config = require('../webpack.config.dev')

  const compiler = webpack(config)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
} else {
  app.use('/static', express.static('dist'))
}

routes.register(app)

app.get('*', (_, res) =>
  res.sendFile(join(__dirname, '../index.html')))

app.listen(port, () => console.log(`Listening on port ${port}`))
