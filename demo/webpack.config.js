const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app/index.js'
  ],
  output: {
    path: __dirname,
    filename: 'demo.js',
    publicPath: '/'
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      //path.resolve(__dirname, './node_modules'),
      //path.resolve(__dirname, '../node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js?/,
        exclude: /(node_modules)/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
