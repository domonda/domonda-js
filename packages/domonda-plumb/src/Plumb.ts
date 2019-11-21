/**
 *
 * Plumb
 *
 */

export interface Disposable {
  dispose: () => void;
}

export type Subscriber<S, T> =
  | ((state: Readonly<S>, tag: T) => void)
  | {
      dispose?: () => void;
      next?: (state: Readonly<S>, tag: T) => void;
    };

export type Subscription = Disposable;

export type Transformer<S, T> = (state: Readonly<S>, tag: T | undefined) => S; // tag is undefined on initial transform

export type Filter<S, T> = (state: S, tag: T) => boolean;

export type Selector<S, K> = (state: Readonly<S>) => K;

export type Updater<S, K> = (state: Readonly<S>, selectedState: Readonly<K>) => S;

export interface ChainProps<S, K, T> extends PlumbProps<K, T> {
  selector: Selector<S, K>;
  updater: Updater<S, K>;
  filter?: Filter<K, T>;
}

export interface PlumbProps<S, T> {
  transformer?: Transformer<S, T>;
  skipInitialTransform?: boolean;
}

export interface Plumb<S, T> extends Disposable {
  readonly state: S;
  readonly lastTag: T | undefined; // undefined because of initialization
  readonly subscribers: Subscriber<S, T>[];
  readonly disposed: boolean;
  chain: <K>(props: ChainProps<S, K, T>, tag: T) => Plumb<K, T>;
  next: (state: S, tag: T) => void;
  subscribe: (subscriber: Subscriber<S, T>) => Subscription;
}
