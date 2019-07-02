import { jss } from 'react-jss';
import functions from 'jss-plugin-rule-value-function';
import global from 'jss-plugin-global';
import nested from 'jss-plugin-nested';
import camelCase from 'jss-plugin-camel-case';
import vendorPrefixer from 'jss-plugin-vendor-prefixer';
import propsSort from 'jss-plugin-props-sort';

// Sets up the JSS instance by injecting necessary plugins.
export function install() {
  return jss.setup({
    plugins: [functions(), global(), nested(), camelCase(), vendorPrefixer(), propsSort()],
  });
}

export { jss };
