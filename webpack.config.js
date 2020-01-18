const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/_scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'src/scripts'),
    filename: 'bundle.js',
  },
}
