const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const nconf = require('nconf')
  .env({ separator: '__', lowerCase: true })
  .file({ file: 'config.json', dir: './', search: true })

const apiURL = nconf.get('api:url')

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API__URL': apiURL
          ? JSON.stringify(apiURL)
          : 'location.host.replace(/^(.+?)\\./, \'//$1-api.\')'
      }
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new TransferWebpackPlugin([
      { from: 'assets', to: './' }
    ], path.join(__dirname, 'src'))
  ],
  postcss: [
    require('postcss-import')({
      path: ['src', 'src/styles']
    }),
    require('postcss-css-variables'),
    require('postcss-custom-media'),
    require('postcss-each'),
    require('postcss-for'),
    require('postcss-nested'),
    require('postcss-short'),
    require('autoprefixer'),
    require('cssnano')({
      zindex: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&sourceMap=true&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'src/styles',
      'src/components',
      'node_modules',
      'src'
    ],
    extensions: ['', '.js', '.css', '.json']
  }
}