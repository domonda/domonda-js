// @ts-ignore since `createUseStyles` is missing type definitions
import { createUseStyles } from 'react-jss';
import { Styles, ClassNameMap, ClassKeyOfStyles, PropsOfStyles } from './createStyles';
import { WithStylesOptions } from './withStyles';

// auto-install
import { install } from './jss';
install();

export interface MakeStylesOptions extends Omit<WithStylesOptions, 'injectTheme'> {
  /**
   * `name` is required because of DX. Navigating the HTML element inspector
   * is easier with names. Should always be the component name.
   */
  name: string;
}

export function makeStyles<S extends Styles<any, any>>(styles: S, options: MakeStylesOptions) {
  return createUseStyles<ClassKeyOfStyles<S>>(styles, options) as keyof PropsOfStyles<
    S
  > extends never // empty interface (`{}`) check
    ? () => ClassNameMap<ClassKeyOfStyles<S>>
    : (props: PropsOfStyles<S>) => ClassNameMap<ClassKeyOfStyles<S>>;
}
