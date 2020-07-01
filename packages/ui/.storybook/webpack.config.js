const path = require('path');

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');

module.exports = ({ config }) => {
  const dev = config.mode === 'development';

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

  return config;
};
