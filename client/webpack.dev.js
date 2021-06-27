const { merge } = require('webpack-merge');
const path = require('path');
const DotenvPlugin = require('dotenv-webpack');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
  plugins: [new DotenvPlugin()],
});
