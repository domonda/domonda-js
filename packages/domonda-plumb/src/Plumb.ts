/**
 *
 * Plumb.d
 *
 */

export interface Disposable {
  dispose: () => void;
}

export type Subscriber<T> =
  | ((state: Readonly<T>) => void)
  | ({
      dispose?: () => void;
      next?: (state: Readonly<T>) => void;
    });

export type Subscription = Disposable;

export type Handler<T> = (state: Readonly<T>) => T;

export type Filter<T> = (state: T) => boolean;

export type Selector<T, K> = (state: Readonly<T>) => K;

export type Updater<T, K> = (state: Readonly<T>, selectedState: Readonly<K>) => T;

export interface ChainProps<T, K> {
  selector: Selector<T, K>;
  updater: Updater<T, K>;
  filter?: Filter<K>;
}

export interface PlumbProps<T> {
  handler?: Handler<T>;
}

export interface Plumb<T> extends Disposable {
  readonly state: T;
  readonly subscribers: Subscriber<T>[];
  chain: <K>(props: ChainProps<T, K>) => Plumb<K>;
  next: (state: T) => void;
  subscribe: (subscriber: Subscriber<T>) => Subscription;
}
