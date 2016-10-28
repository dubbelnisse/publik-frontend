const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const HappyPack = require('happypack')

const nconf = require('nconf')
  .env({ separator: '__', lowerCase: true })
  .file({ file: 'config.json', dir: './', search: true })
  .defaults({ api: { url: 'http://publik-api.nilssonnils.se' } })

nconf.get('api:url')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new TransferWebpackPlugin([
      { from: 'assets', to: './' }
    ], path.join(__dirname, 'src')),
    new webpack.NoErrorsPlugin(),
    new LiveReloadPlugin(),
    new HappyPack({
      threads: 4,
      loaders: ['babel']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'API__URL': JSON.stringify(nconf.get('api:url'))
      }
    }),
  ],
  postcss: [
    require('postcss-import')({
      path: 'src'
    }),
    require('postcss-css-variables'),
    require('postcss-custom-media'),
    require('postcss-each'),
    require('postcss-for'),
    require('postcss-nested'),
    require('postcss-short'),
    require('autoprefixer'),
    require('cssnano')({
      discardUnused: false,
      zindex: false
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'happypack/loader',
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
    extensions: ['', '.js', '.css', '.json', '.md']
  }
}
