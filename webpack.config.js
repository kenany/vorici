'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  return {
    devtool: 'cheap-module-source-map',
    entry: path.resolve(__dirname, 'index.js'),
    mode,
    output: {
      path: path.resolve(__dirname, 'out'),
      filename: 'static/js/bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
      publicPath: '/',
      devtoolModuleFilenameTemplate: (info) =>
        path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
    },
    optimization: {
      minimize: mode === 'production'
    },
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
                postcssOptions: {
                  plugins: [
                    'autoprefixer',
                    'postcss-flexbugs-fixes'
                  ]
                }
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
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode)
      })
    ]
  };
};
