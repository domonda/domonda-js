const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = ({ config }) => {
  const dev = config.mode === 'development';

  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: dev ? { transpileOnly: true, experimentalWatchApi: true } : {},
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  });

  if (dev) {
    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
      }),
    );
  }

  return config;
};
