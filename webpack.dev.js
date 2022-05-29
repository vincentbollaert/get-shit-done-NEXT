// https://gist.github.com/vincentbollaert/e90def9b351d8d97c90ef7cfd887685e

const { merge } = require('webpack-merge');
const fs = require('fs');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 3010,
    historyApiFallback: true,
    https: {
      key: fs.readFileSync('./certificates/localhost-key.pem'),
      cert: fs.readFileSync('./certificates/localhost.pem'),
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.(css)$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(scss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    ],
  },
});
