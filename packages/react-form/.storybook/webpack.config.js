const path = require('path');

module.exports = ({ config }) => {
  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = {
    '@domonda/form': path.resolve(__dirname, '../../form/src'),
    '@domonda/ui': path.resolve(__dirname, '../../ui/src'),
    '@domonda/plumb': path.resolve(__dirname, '../../plumb/src'),
    '@domonda/react-plumb': path.resolve(__dirname, '../../react-plumb/src'),
  };

  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: [/node_modules/, /__tests__/],
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

  return config;
};
