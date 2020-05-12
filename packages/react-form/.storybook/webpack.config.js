const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');

module.exports = ({ config }) => {
  const dev = config.mode === 'development';

  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = {
    react: path.resolve(__dirname, '../node_modules/react'),
    'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
    '@domonda/form': path.resolve(__dirname, '../../form/src'),
    '@domonda/ui': path.resolve(__dirname, '../../ui/src'),
  };

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: !dev,
          configFile: tsconfigPath,
        },
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ],
  });

  // https://github.com/TypeStrong/ts-loader/tree/87340f49e2ebfd5158c26dbcfef1b2beb177f7c3#transpileonly
  config.stats = {
    ...config.stats,
    warningsFilter: /export .* was not found in/,
  };

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
