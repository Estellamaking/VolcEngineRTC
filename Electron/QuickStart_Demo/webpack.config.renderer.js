const path = require('path');

module.exports = {
  entry: './src/renderer/index.js',
  target: 'electron-renderer',
  node: {
    __dirname: true,
  },
  output: {
    filename: 'renderer.js',
    path: path.resolve(__dirname, './app'),
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts(?:x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          configFile: path.join(__dirname, 'tsconfig.json'),
        },
      },
    ],
  },
};
