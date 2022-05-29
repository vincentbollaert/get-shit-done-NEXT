// https://gist.github.com/vincentbollaert/e90def9b351d8d97c90ef7cfd887685e

const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    pathinfo: false,
  },
  module: {
    rules: [
      { test: /\.(css)$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(scss)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
    removeAvailableModules: false,
    removeEmptyChunks: false,
  },
  plugins: [
    // TODO: This is an old sw config. See if it works and find out about optimising it
    // commented out for now as it does not update properly and then I broke the site by de-registering or w/e-ing it
    // new GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   maximumFileSizeToCacheInBytes: 10000000,
    // }),
    // TODO: compress css
    // TODO: I used to compress to gz and br manually here, confirm if this is still necessary
    new CompressionPlugin(),
  ],
});
