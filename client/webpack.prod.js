const { merge } = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'auto',
  },
  mode: 'production',
});