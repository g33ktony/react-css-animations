const path = require('path')
const webpack = require('webpack')
const express = require('express')
const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './index.html')))

app.listen(8000, _ => {
  console.log('Listening on port 8000')
})
