const path = require('path')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.config')

module.exports = merge(commonConfig, {
	output: {
		path: path.resolve(__dirname, 'build')
	},
  devtool: 'eval-source-map',
  devServer: {
    port: 8080,
    disableHostCheck: true,
    historyApiFallback: true,
  }
})