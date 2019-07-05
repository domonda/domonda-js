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
    createGenerateId:
      process.env.NODE_ENV === 'production'
        ? () => {
            let ruleCounter = 0;
            return (_0, sheet) => {
              ruleCounter += 1;

              let prefix = '';
              let jssId = '';
              if (sheet) {
                if (sheet.options.classNamePrefix) {
                  prefix = sheet.options.classNamePrefix;
                }
                // id can indeed exist (copied from the official JSS repo)
                if ((sheet.options.jss as any).id != null) {
                  jssId = String((sheet.options.jss as any).id);
                }
              }

              return `${prefix || 'c'}${jssId}${ruleCounter}`;
            };
          }
        : undefined,
    plugins: [functions(), global(), nested(), camelCase(), vendorPrefixer(), propsSort()],
  });
}

export { jss };
