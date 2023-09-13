const path = require('path');
const glob = require('glob');
const fs = require('fs');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: getEntryPoints(),
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  externals: [
    /^(k6|https?\:\/\/)(\/.*)?/,
    // nodeExternals()
  ],
  devtool: "source-map",
  stats: {
    colors: true,
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new Dotenv(),
  ],
  optimization: {
    minimize: false,
  },
};


function getEntryPoints() {
  const entryPoints = {};
  const srcDir = path.resolve(__dirname, 'src');

  // Recursively find TypeScript files in the src directory
  function findFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const relativePath = path.relative(srcDir, filePath);

      if (fs.statSync(filePath).isDirectory()) {
        findFiles(filePath);
      } else if (path.extname(file) === '.ts') {
        const entryName = relativePath.replace(/\.ts$/, '').replace(/\\/g, '/');
        entryPoints[entryName] = filePath;
      } else if(path.extname(file) === '.json') {
        entryPoints[relativePath] = filePath;
      }
    });
  }

  findFiles(srcDir);

  return entryPoints;
}