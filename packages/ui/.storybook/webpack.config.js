const path = require('path');
const { TreatPlugin } = require('treat/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ config }) => {
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          root: path.resolve(__dirname, '../../..'),
          cacheDirectory: true,
          cacheCompression: false, // unnecessary compression
        },
      },
    ],
  });

  config.plugins = [
    new TreatPlugin({
      outputLoaders: [MiniCssExtractPlugin.loader],
    }),
    new MiniCssExtractPlugin(),
    ...config.plugins,
  ];

  return config;
};
