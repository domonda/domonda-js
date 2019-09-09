/**
 *
 * PlumbContext
 *
 */

import React, { useContext, PropsWithChildren } from 'react';
import { createPlumb, Plumb } from '@domonda/plumb';
import { usePlumb, UsePlumbProps } from './usePlumb';

export const PlumbContext = React.createContext(createPlumb<any, any>(undefined));

export function usePlumbContext<S, T>(): Plumb<S, T> {
  const plumb = useContext(PlumbContext);
  return plumb;
}

export interface PlumbProviderProps<S, T> extends UsePlumbProps<S, T> {
  state: S;
  tag: T;
}

export function PlumbProvider<S, T>(props: PropsWithChildren<PlumbProviderProps<S, T>>) {
  const { children, state, tag, ...rest } = props;
  const plumb = usePlumb(state, tag, rest);
  return <PlumbContext.Provider value={plumb}>{children}</PlumbContext.Provider>;
}
