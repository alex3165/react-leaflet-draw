/* eslint-disable */
const TerserPlugin = require('terser-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  mode: 'production',
  output: {
    library: 'ReactLeaflet',
    libraryTarget: 'umd'
  },
  externals: [
    {
      leaflet: {
        amd: 'leaflet',
        commonjs: 'leaflet',
        commonjs2: 'leaflet',
        root: 'L'
      }
    },
    {
      'leaflet-draw': {
        amd: 'leaflet-draw',
        commonjs: 'leaflet-draw',
        commonjs2: 'leaflet-draw',
        root: 'L'
      }
    },
    {
      'react-leaflet': {
        amd: 'react-leaflet',
        commonjs: 'react-leaflet',
        commonjs2: 'react-leaflet'
      }
    },
    {
      react: {
        amd: 'react',
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React'
      }
    }
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env", {"modules": false}],
            "@babel/react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/,
      }),
    ],
  },
};
