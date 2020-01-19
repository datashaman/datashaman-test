const path = require('path')

module.exports = {
  mode: 'development',
  entry: './scripts/main.js',
  output: {
    path: path.resolve(__dirname, '_site/scripts'),
    filename: 'bundle.js',
  },
}
