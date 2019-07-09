const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

/**
 *
 * `ts-loader` has a bug where it produces false-positives about missing exports when
 * in `transpileOnly` mode. The `IgnoreNotFoundExportPlugin` omits those warnings.
 *
 * Take a look at: https://github.com/TypeStrong/ts-loader/issues/653#issuecomment-390889335
 *
 */
// eslint-disable-next-line import/order
const ModuleDependencyWarning = require('webpack/lib/ModuleDependencyWarning');
class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    const messageRegExp = /export '.*'( \(reexported as '.*'\))? was not found in/;
    const doneHook = (stats) => {
      // eslint-disable-next-line no-param-reassign
      stats.compilation.warnings = stats.compilation.warnings.filter((warn) => {
        if (warn instanceof ModuleDependencyWarning && messageRegExp.test(warn.message)) {
          return false;
        }
        return true;
      });
    };

    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreNotFoundExportPlugin', doneHook);
    } else {
      compiler.plugin('done', doneHook);
    }
  }
}

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
      new IgnoreNotFoundExportPlugin(),
    );
  }

  return config;
};
