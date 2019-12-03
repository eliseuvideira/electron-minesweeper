const { join } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: join(__dirname, 'app', 'renderer', 'src', 'index.js'),
  target: 'electron-renderer',
  output: {
    path: join(__dirname, 'app', 'renderer', 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties'],
            },
          },
        ],
        resolve: { extensions: ['.js', '.jsx', '.json'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: 'file-loader', options: { publicPath: './build/' } }],
      },
    ],
  },
};
