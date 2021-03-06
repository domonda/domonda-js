/**
 *
 * createPlumb
 *
 */

import { Subscriber, Transformer, Selector, ChainProps, PlumbProps, Plumb } from './Plumb';

export function createPlumb<S, T>(initialState: S, props: PlumbProps<S, T> = {}): Plumb<S, T> {
  const { transformer, skipInitialTransform } = props;

  const disposeHandlers: (() => void)[] = [];
  let disposed = false;
  let internalState = initialState;
  let lastTag: T | undefined;

  if (transformer && !skipInitialTransform) {
    internalState = transformer(internalState, undefined);
  }

  // when the chained plumb triggers next it internally transforms
  // the value before sending it to next, this flag is used to
  // skip transforming the value twice
  let skipTransformer: Transformer<S, T> | null = null;

  const transformers: Transformer<S, T>[] = [];
  const subscribers: Subscriber<S, T>[] = [];

  function subscribe(subscriber: Subscriber<S, T>) {
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

  function next(state: S, tag: T) {
    if (disposed) {
      throw new Error('cannot send a value through a disposed plumb');
    }

    internalState = state;
    lastTag = tag;

    // first do all extra transformers
    for (const transformer of transformers) {
      if (transformer !== skipTransformer) {
        internalState = transformer(internalState, tag);
      }
    }

    // then do main transformer
    if (transformer) {
      internalState = transformer(internalState, tag);
    }

    for (const subscriber of subscribers) {
      if (typeof subscriber === 'function') {
        subscriber(internalState, tag);
      } else if (subscriber.next) {
        subscriber.next(internalState, tag);
      }
    }
  }

  function chain<K>(props: ChainProps<S, K, T>, chainTag: T): Plumb<K, T> {
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

    const memoData = {
      state: internalState,
      selectedState: selector(internalState),
    };
    const memoSelector: Selector<S, K> = (state) => {
      if (memoData.state !== state) {
        memoData.state = state;
        memoData.selectedState = selector(memoData.state);
      }
      return memoData.selectedState;
    };

    function parentTransformer(state: S, tag: T | undefined) {
      let selectedState = memoSelector(state);
      if (chainTransformer) {
        selectedState = chainTransformer(selectedState, tag);
      }
      return updater(state, selectedState);
    }
    transformers.push(parentTransformer);

    let isInitialTransform = true;
    let parentNext = false; // next is triggered by the parent plumb
    let chainedNext = false; // next is triggered on the chained/child plump

    const chained = createPlumb<K, T>(memoSelector(internalState), {
      transformer: (selectedState, tag) => {
        if (chainTransformer) {
          if (chainSkipInitialTransform && isInitialTransform) {
            // skip initial transform
          } else {
            selectedState = chainTransformer(selectedState, tag);
          }
        }

        if (!parentNext) {
          const nextState = updater(internalState, selectedState);
          if (internalState !== nextState) {
            chainedNext = true;
            skipTransformer = parentTransformer;
            next(nextState, isInitialTransform ? (chainTag as any) : tag);
            skipTransformer = null;
            chainedNext = false;

            isInitialTransform = false;
            return memoSelector(internalState);
          }
        }

        isInitialTransform = false;
        return selectedState;
      },
    });

    const subscription = subscribe((state, tag) => {
      if (!chainedNext) {
        const selectedState = memoSelector(state);
        if (filter(selectedState, tag)) {
          parentNext = true;
          chained.next(selectedState, tag);
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

    internalState = (undefined as any) as S;
    lastTag = undefined;
    disposed = true;
  }

  return {
    get state() {
      if (disposed) {
        throw new Error('cannot get state of a disposed plumb');
      }
      return internalState;
    },
    get lastTag() {
      if (disposed) {
        throw new Error('cannot get last tag of a disposed plumb');
      }
      return lastTag;
    },
    get subscribers() {
      if (disposed) {
        throw new Error('cannot get subscribers of a disposed plumb');
      }
      return subscribers;
    },
    get disposed() {
      return disposed;
    },
    next,
    subscribe,
    chain,
    dispose,
  };
}
