const webpack = require('webpack');
 
module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10240,
              // make all svg images to work in IE
              iesafe: true,
            },
          },
        ],
      },
    ],
  },
};