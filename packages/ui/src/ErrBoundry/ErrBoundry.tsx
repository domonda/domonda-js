/**
 *
 * ErrBoundry
 *
 */

import React from 'react';
import { Err, ErrProps } from '../Err';

export type ErrBoundryProps = Pick<ErrProps, Exclude<keyof ErrProps, 'error' | 'onRetry'>>;

interface State {
  error: Error | null;
}

export class ErrBoundry extends React.PureComponent<ErrBoundryProps, State> {
  public state: State = {
    error: null,
  };

  private unsetError = () => this.setState({ error: null });

  public componentDidCatch(error: Error) {
    this.setState({ error });
  }

  public render() {
    const { children, ...rest } = this.props;
    const { error } = this.state;

    if (error) {
      return <Err {...rest} error={error} onRetry={this.unsetError} />;
    }

    return children;
  }
}
