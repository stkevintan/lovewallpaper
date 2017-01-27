const path = require('path');
const webpack = require('webpack');

module.exports = {
  watch: true,
  cache: true,
  // target: 'atom',
  devtool: 'source-map',
  output: {
    // path: path.join(__dirname, 'app'),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    sourceMapFilename: '[name].map',
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, 'src/js'),
      ],
      exclude: /node_modules/,
      // Only run `.js` and `.jsx` files through Babel
      test: /\.js|\.jsx?$/,

      // Options to configure babel with
      query: {
        cacheDirectory: true,
        plugins: ['transform-decorators-legacy'],
        presets: ['es2015', 'stage-0', 'react'],
      },
    },
    {
      loader: 'json-loader',
      test: /\.json?$/,
      exclude: /node_modules/,
    }],
  },
  // plugins: [
  //   new webpack.optimize.DedupePlugin(),
  //   new webpack.optimize.UglifyJsPlugin({ comments: false }),
  // ],
};
