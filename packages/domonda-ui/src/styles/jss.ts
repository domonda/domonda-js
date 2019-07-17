import { jss } from 'react-jss';
import functions from 'jss-plugin-rule-value-function';
import global from 'jss-plugin-global';
import nested from 'jss-plugin-nested';
import camelCase from 'jss-plugin-camel-case';
import vendorPrefixer from 'jss-plugin-vendor-prefixer';
import propsSort from 'jss-plugin-props-sort';

let DOMONDA_UI_JSS_INSTALLED = false;

// Sets up the JSS instance by injecting necessary plugins.
export function install() {
  if (DOMONDA_UI_JSS_INSTALLED) {
    return;
  }
  DOMONDA_UI_JSS_INSTALLED = true;
  return jss.setup({
    createGenerateId:
      process.env.NODE_ENV === 'production'
        ? () => {
            let ruleCounter = 0;
            return (_0, sheet) => {
              ruleCounter += 1;

              let jssId = '';
              if (sheet) {
                // id can indeed exist (copied from the official JSS repo)
                if ((sheet.options.jss as any).id != null) {
                  jssId = String((sheet.options.jss as any).id);
                }
              }

              return `c${jssId}${ruleCounter}`;
            };
          }
        : undefined,
    plugins: [functions(), global(), nested(), camelCase(), vendorPrefixer(), propsSort()],
  });
}

export { jss };
