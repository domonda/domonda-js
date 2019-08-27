/**
 *
 * QueryParamsContext
 *
 */

import React from 'react';
import { History } from 'history';

export const QueryParamsContext = React.createContext<History | null>(null);

export interface QueryParamsProviderProps {
  history: History;
}

export const QueryParamsProvider: React.FC<QueryParamsProviderProps> = (props) => {
  const { history, children } = props;
  return <QueryParamsContext.Provider value={history}>{children}</QueryParamsContext.Provider>;
};
