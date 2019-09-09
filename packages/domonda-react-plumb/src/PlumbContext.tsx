/**
 *
 * PlumbContext
 *
 */

import React, { useContext, PropsWithChildren } from 'react';
import { createPlumb, Plumb } from '@domonda/plumb';
import { usePlumb, UsePlumbProps } from './usePlumb';

const PlumbContext = React.createContext(createPlumb(undefined));

export function usePlumbContext<S, T>(): Plumb<S, T> {
  const plumb = useContext(PlumbContext);
  return (plumb as any) as Plumb<S, T>;
}

export interface PlumbProviderProps<S, T> extends UsePlumbProps<S, T> {
  state: S;
  tag: T;
}

export function PlumbProvider<S, T>(props: PropsWithChildren<PlumbProviderProps<S, T>>) {
  const { children, state, tag, ...rest } = props;
  const plumb = usePlumb(state, tag, rest);
  return <PlumbContext.Provider value={plumb as any}>{children}</PlumbContext.Provider>;
}
