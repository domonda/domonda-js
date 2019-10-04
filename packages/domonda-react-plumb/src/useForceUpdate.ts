/**
 *
 * useForceUpdate
 *
 */

import { useState, useCallback } from 'react';

export function useForceUpdate() {
  const [, setCounter] = useState(0);
  const forceUpdate = useCallback(() => setCounter((counter) => counter + 1), []);
  return forceUpdate;
}
