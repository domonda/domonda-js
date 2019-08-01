/**
 *
 * createPlumb
 *
 */

import { Subscriber, Transformer, ChainProps, PlumbProps, Plumb } from './Plumb';

// should the transformers be called initially?

export function createPlumb<T>(initialState: T, props: PlumbProps<T> = {}): Plumb<T> {
  const { transformer, skipInitialTransform } = props;

  let disposeHandlers: (() => void)[] = [];
  let disposed = false;
  let internalState = initialState;

  if (transformer && !skipInitialTransform) {
    internalState = transformer(internalState);
  }

  // when the chained plumb triggers next it internally transforms
  // the value before sending it to next, this flag is used to
  // skip transforming the value twice
  let skipTransformer: Transformer<T> | null = null;

  const transformers: Transformer<T>[] = [];
  const subscribers: Subscriber<T>[] = [];

  function subscribe(subscriber: Subscriber<T>) {
    if (disposed) {
      throw new Error('cannot subscribe to a disposed plumb');
    }

    subscribers.push(subscriber);
    return {
      dispose: () => {
        subscribers.splice(subscribers.indexOf(subscriber), 1);
      },
    };
  }

  function next(state: T) {
    if (disposed) {
      throw new Error('cannot send a value through a disposed plumb');
    }

    internalState = state;

    // first do all extra transformers
    for (const transformer of transformers) {
      if (transformer !== skipTransformer) {
        internalState = transformer(internalState);
      }
    }

    // then do main transformer
    if (transformer) {
      internalState = transformer(internalState);
    }

    for (const subscriber of subscribers) {
      if (typeof subscriber === 'function') {
        subscriber(internalState);
      } else if (subscriber.next) {
        subscriber.next(internalState);
      }
    }
  }

  function chain<K>(props: ChainProps<T, K>): Plumb<K> {
    if (disposed) {
      throw new Error('cannot chain a disposed plumb');
    }

    const {
      selector,
      updater,
      filter = () => true,
      transformer: chainTransformer,
      skipInitialTransform: chainSkipInitialTransform,
    } = props;

    // we have an internal selected state here to avoid unnecessary selector calls
    let selectedState: K;

    function parentTransformer(state: T) {
      selectedState = selector(state);
      if (chainTransformer) {
        selectedState = chainTransformer(selectedState);
      }
      return updater(state, selectedState);
    }
    transformers.push(parentTransformer);

    let isInitialTransform = true;
    let parentNext = false; // next is triggered by the parent plumb
    let chainedNext = false; // next is triggered on the chained/child plump

    selectedState = selector(internalState);
    const chained = createPlumb(selectedState, {
      transformer: (selectedState) => {
        if (chainTransformer) {
          if (chainSkipInitialTransform && isInitialTransform) {
            // skip initial transform
          } else {
            selectedState = chainTransformer(selectedState);
          }
        }
        isInitialTransform = false;

        if (!parentNext) {
          const nextState = updater(internalState, selectedState);
          if (internalState !== nextState) {
            chainedNext = true;
            skipTransformer = parentTransformer;
            next(nextState);
            skipTransformer = null;
            chainedNext = false;

            selectedState = selector(internalState);
            return selectedState;
          }
        }

        return selectedState;
      },
    });

    const subscription = subscribe((state) => {
      if (!chainedNext) {
        if (selectedState === undefined) {
          selectedState = selector(state);
        }
        if (filter(selectedState)) {
          parentNext = true;
          chained.next(selectedState);
          parentNext = false;
        }
      }
    });

    // indicates that dispose was called from the parent
    let parentDispose = false;
    function chainedDispose() {
      parentDispose = true;
      chained.dispose();
    }
    disposeHandlers.push(chainedDispose);

    chained.subscribe({
      dispose: () => {
        subscription.dispose();

        // when parent disposals happen, the transformers will get deleted by the parent
        if (!parentDispose) {
          transformers.splice(transformers.indexOf(parentTransformer), 1);
          disposeHandlers.splice(disposeHandlers.indexOf(chainedDispose), 1);
        }
      },
    });

    return chained;
  }

  function dispose() {
    if (disposed) {
      throw new Error('cannot dispose already disposed plumb');
    }

    for (const subscriber of subscribers) {
      if (typeof subscriber === 'object' && subscriber.dispose) {
        subscriber.dispose();
      }
    }

    subscribers.splice(0, subscribers.length);
    transformers.splice(0, transformers.length);

    for (const disposeHandler of disposeHandlers) {
      disposeHandler();
    }
    disposeHandlers.splice(0, disposeHandlers.length);

    internalState = (undefined as any) as T;
    disposed = true;
  }

  return {
    get state() {
      if (disposed) {
        throw new Error('cannot get state of a disposed plumb');
      }
      return internalState;
    },
    get subscribers() {
      if (disposed) {
        throw new Error('cannot get subscribers of a disposed plumb');
      }
      return subscribers;
    },
    next,
    subscribe,
    chain,
    dispose,
  };
}
