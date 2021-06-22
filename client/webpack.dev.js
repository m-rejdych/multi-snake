const { merge } = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'auto',
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    contentBase: path.join(__dirname, 'build'),
  },
  devtool: 'inline-source-map',
});