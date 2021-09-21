const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const json5 = require('json5')

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public', 'index.html'),
    }),
  ],
  mode: 'development',
}

module.exports = config
