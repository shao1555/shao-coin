const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin("[name].css");

const config = [
  {
    entry: './src/js/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js'
      },
      extensions: ['.js']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['env', {'modules': false} ]
                ]
              }
            }
          ],
          exclude: /node_modules/          
        },
        {
          test: require.resolve('jquery'),
          use: [
            { loader: 'expose-loader', options: 'jQuery' },
            { loader: 'expose-loader', options: '$' }
          ]
        },
        
        {
          test: require.resolve('tether'),
          use: [
            { loader: 'expose-loader', options: 'Tether' }
          ]
        }  
      ],
    },
    devtool: 'source-map'
  },
  {
    /* ----------------
       CSS用モジュール
      ----------------- */
    entry: {
      main: "./src/scss/main.scss"
    },
    output: {
      path: path.resolve(__dirname, "dist/css"),
      publicPath: '/css/',
      filename: "[name].css"
    },
    module: {
      rules: [
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'url-loader'
            }
          ]
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: extractSass.extract({
            fallback: "style-loader",
            use: [ "css-loader", "sass-loader" ]
          })
        }
      ]
    },
    plugins: [
      extractSass
    ],
    resolve: {
      extensions: ['.css', '.js']
    },
  }
];

module.exports = config;