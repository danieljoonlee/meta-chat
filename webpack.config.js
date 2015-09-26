var path = require('path');

module.exports = {
  entry: './src/client/client.js',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.jsx?$/, 
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  }
}
