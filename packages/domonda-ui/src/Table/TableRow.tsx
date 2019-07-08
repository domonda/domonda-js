import * as React from 'react';
import clsx from 'clsx';
import { generateStaticClassName, withStyles, WithStyles, createStyles } from '../styles';

const styles = createStyles({
  root: {
    display: 'flex',
    all: 'unset',
  },
});

interface TableRowProps extends React.HTMLAttributes<HTMLElement> {
  component?: string | React.ComponentType<React.HTMLAttributes<HTMLElement>>;
}

export const tableRowClassName = generateStaticClassName('TableRow');

const TableRow: React.FC<TableRowProps & WithStyles<typeof styles>> = (props) => {
  const {
    classes,
    className,
    children,
    component: Component = 'div' as React.ElementType<React.ComponentPropsWithRef<'div'>>,
    ...rest
  } = props;

  return (
    <Component {...rest} className={clsx(classes.root, tableRowClassName, className)}>
      {children}
    </Component>
  );
};

const StyledTableRow = withStyles(styles)(TableRow);
export { StyledTableRow as TableRow };
