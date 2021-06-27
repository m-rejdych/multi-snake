const { merge } = require('webpack-merge');
const path = require('path');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;

const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  mode: 'production',
  plugins: [new EnvironmentPlugin(['NODE_ENV', 'PORT', 'SERVER_URL'])],
});
