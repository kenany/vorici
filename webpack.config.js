'use strict';

const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const path = require('path');
const process = require('process');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
    devtoolModuleFilenameTemplate: (info) =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    alias: {
      lodash: 'lodash-es'
    },
    extensions: ['.js', '.json', '.jsx']
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: { importLoaders: 1 }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '> 5%'
                  ]
                })
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public', 'index.html')
    }),
    new LodashWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`
    })
  ]
};
