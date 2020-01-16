const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');

module.exports = ({ config }) => {
  const dev = config.mode === 'development';

  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: Object.assign(dev ? { transpileOnly: true, experimentalWatchApi: true } : {}, {
          configFile: tsconfigPath,
        }),
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  });

  if (dev) {
    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        tsconfig: tsconfigPath,
        checkSyntacticErrors: true,
      }),
    );
  }

  return config;
};
