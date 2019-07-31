/**
 *
 * createPlumb
 *
 */

import { shallowEqual } from './equality';
import { Subscriber, Handler, ChainProps, PlumbProps, Plumb } from './Plumb';

export function createPlumb<T>(initialState: T, props: PlumbProps<T> = {}): Plumb<T> {
  const { handler } = props;

  let disposeHandlers: (() => void)[] = [];
  let disposed = false;
  let internalState = initialState;

  // when the chained plumb triggers next it internally handles
  // the value before sending it to next, this flag is used to
  // skip re-handling the value
  let skipHandler: Handler<T> | null = null;

  const handlers: Handler<T>[] = [];
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

    // first do all extra handlers
    for (const handler of handlers) {
      if (handler !== skipHandler) {
        internalState = handler(internalState);
      }
    }

    // then do main handler
    if (handler) {
      internalState = handler(internalState);
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

    const { selector, updater, filter = () => true } = props;

    let selectedState = selector(internalState);

    const nextState = updater(internalState, selectedState);
    if (!shallowEqual(internalState, nextState)) {
      next(nextState);
      selectedState = selector(internalState);
    }

    handlers.push(chainHandler);

    function chainHandler(state: T) {
      return updater(state, selectedState);
    }

    let parent = false; // next is triggered by the parent plumb
    let child = false; // next is triggered on the chained plump
    const chained = createPlumb(selectedState, {
      handler: (selectedState) => {
        if (!parent) {
          const nextState = updater(internalState, selectedState);
          if (!shallowEqual(internalState, nextState)) {
            child = true;
            skipHandler = chainHandler;
            next(nextState);
            skipHandler = null;
            child = false;
            return selector(internalState);
          }
        }
        return selectedState;
      },
    });

    const subscription = subscribe((state) => {
      if (!child) {
        selectedState = selector(state);
        if (filter(selectedState)) {
          parent = true;
          chained.next(selectedState);
          parent = false;
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

        // when parent disposals happen, the handlers will get deleted by the parent
        if (!parentDispose) {
          handlers.splice(handlers.indexOf(chainHandler), 1);
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
    handlers.splice(0, handlers.length);
    internalState = (undefined as any) as T;

    for (const disposeHandler of disposeHandlers) {
      disposeHandler();
    }
    disposeHandlers.splice(0, disposeHandlers.length);

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
