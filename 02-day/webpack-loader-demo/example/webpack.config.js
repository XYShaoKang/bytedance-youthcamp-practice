const path = require('path')

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
    rules: [
      {
        test: /\.md$/,
        use: path.resolve('../lib/index.cjs.js'),
      },
    ],
  },
  plugins: [],
  mode: 'development',
}

module.exports = config
