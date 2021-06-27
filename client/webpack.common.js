const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;

module.exports = {
  entry: './src/index.js',
  target: 'web',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new CleanWebpackPlugin(),
    new EnvironmentPlugin(['NODE_ENV', 'PORT', 'SERVER_URL']),
  ],
};
