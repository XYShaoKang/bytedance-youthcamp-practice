const path = require('path')
const HtmlPlugin = require('../index.js')

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: {
    main: './index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [],
  },
  plugins: [new HtmlPlugin()],
  mode: 'development',
}

module.exports = config
