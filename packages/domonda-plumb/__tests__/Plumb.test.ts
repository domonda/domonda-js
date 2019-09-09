import { createPlumb } from '../src/createPlumb';

describe('Plumb', () => {
  describe('create', () => {
    it('should initialize with state', () => {
      const plumb = createPlumb('');

      expect(plumb.state).toBe('');
      expect(plumb.lastTag).toBeUndefined();
    });
  });

  describe('subscribe', () => {
    it('should not be notified with initial state', () => {
      const plumb = createPlumb('');

      const spy1 = jest.fn();
      const spy2 = jest.fn();

      plumb.subscribe(spy1);
      plumb.subscribe({ next: spy2 });

      expect(spy1).not.toBeCalled();
      expect(spy2).not.toBeCalled();
    });

    it('should serve current subscribers through subscribers', () => {
      const plumb = createPlumb('');

      const spy = jest.fn();
      const sub = { next: spy };

      plumb.subscribe(spy);
      plumb.subscribe(sub);

      expect(plumb.subscribers).toEqual([spy, sub]);
    });

    it('should receive tags from tagged nexts and store the last tag', () => {
      const plumb = createPlumb('');

      const tags = ['1', '2', 'three', 'f0ur'];

      const spy1 = jest.fn((_0, _1) => {});
      plumb.subscribe(spy1);

      const spy2 = jest.fn((_0, _1) => {});
      plumb.subscribe({ next: spy2 });

      tags.forEach((tag) => {
        plumb.next('', tag);
        expect(plumb.lastTag).toBe(tag);
      });

      expect(spy1).toBeCalledTimes(tags.length);
      expect(spy2).toBeCalledTimes(tags.length);
      tags.forEach((tag, index) => {
        expect(spy1.mock.calls[index][1]).toBe(tag);
        expect(spy2.mock.calls[index][1]).toBe(tag);
      });

      expect(plumb.lastTag).toBe(tags[tags.length - 1]);
    });

    describe('dispose', () => {
      it('should remove the subscriber', () => {
        const plumb = createPlumb('');

        const others = [() => {}, () => {}, () => {}, () => {}];

        others.forEach((sub) => {
          plumb.subscribe(sub);
        });

        const spy = jest.fn();
        const subscription = plumb.subscribe(spy);

        others.forEach((sub) => {
          plumb.subscribe(sub);
        });

        subscription.dispose();

        [1, 2, 3].forEach((index) => {
          plumb.next(index.toString(), undefined);
        });

        expect(plumb.subscribers).toEqual([...others, ...others]);
        expect(spy).toBeCalledTimes(0);
      });
    });
  });

  describe('transformer', () => {
    it('should transform initial state', () => {
      const initialState = {};
      const handledState = {};

      const spy = jest.fn((_0) => handledState);
      const plumb = createPlumb(initialState, { transformer: spy });

      expect(spy).toBeCalled();
      expect(spy.mock.calls[0][0]).toBe(initialState);
      expect(plumb.state).toBe(handledState);
    });

    it('should receive tags from tagged nexts and store the last tag', () => {
      const spy = jest.fn((_0, _1) => '');
      const plumb = createPlumb('', { transformer: spy, skipInitialTransform: true });

      const tags = ['one', '2', 'three', '4'];

      tags.forEach((tag) => {
        plumb.next('', tag);
        expect(plumb.lastTag).toBe(tag);
      });

      expect(spy).toBeCalledTimes(tags.length);
      tags.forEach((tag, index) => {
        expect(spy.mock.calls[index][1]).toBe(tag);
      });

      expect(plumb.lastTag).toBe(tags[tags.length - 1]);
    });

    it('should skip initial transform with skipInitialTransform', () => {
      const initialState = {};
      const handledState = {};

      const spy = jest.fn((_0) => handledState);
      const plumb = createPlumb(initialState, { transformer: spy, skipInitialTransform: true });

      expect(spy).not.toBeCalled();
      expect(plumb.state).toBe(initialState);
    });

    it('should transform first, then notify the subscribers when using next', () => {
      const handledState = { second: 2 };
      const transformer = jest.fn((_0) => handledState);

      const plumb = createPlumb<{ [key: string]: any }, undefined>(
        {},
        { transformer, skipInitialTransform: true },
      );

      const subscriber = jest.fn();
      plumb.subscribe(subscriber);

      const nextState = { first: 1 };
      plumb.next(nextState, undefined);

      expect(transformer).toBeCalledTimes(1);
      expect(transformer.mock.calls[0][0]).toBe(nextState);

      expect(subscriber).toBeCalledTimes(1);
      expect(subscriber.mock.calls[0][0]).toBe(handledState);

      expect(plumb.state).toBe(handledState);
    });
  });

  describe('chain', () => {
    interface State {
      people: {
        id: string;
        name: string;
      }[];
    }

    const initialState: State = {
      people: [
        {
          id: '1',
          name: 'John',
        },
      ],
    };

    function selector(state: State) {
      return state.people[0];
    }

    it('should create chain correctly', () => {
      const plumb = createPlumb(initialState);

      const spy = jest.fn();
      plumb.subscribe(spy);

      const person = plumb.chain(
        {
          selector,
          updater: () => initialState,
        },
        undefined,
      );

      expect(spy).toBeCalledTimes(0);
      expect(plumb.subscribers.length).toBe(2); // spy subscription and the chain
      expect(person.state).toBe(selector(plumb.state));
    });

    it('should initialize with handled state and notify the parent', (done) => {
      const plumb = createPlumb(initialState);

      const jane = {
        id: '2',
        name: 'Jane',
      };

      const spy = jest.fn();

      plumb.subscribe((state) => {
        expect(selector(state)).toBe(jane);
        expect(spy).toBeCalledTimes(0);
        done();
      });

      const person = plumb.chain(
        {
          selector,
          updater: () => {
            return {
              people: [jane],
            };
          },
        },
        undefined,
      );
      person.subscribe(spy);

      expect(person.state).toBe(jane);
    });

    it('should should update parent state correctly', () => {
      const plumb = createPlumb(initialState);

      const updater = jest.fn((_0, personState) => {
        return {
          people: [personState],
        };
      });
      const person = plumb.chain(
        {
          selector,
          updater,
        },
        undefined,
      );

      const plumbSpy = jest.fn((_0) => {});
      plumb.subscribe(plumbSpy);

      const jane = {
        id: '2',
        name: 'Jane',
      };

      const personSpy = jest.fn((_0) => {});
      person.subscribe(personSpy);

      person.next(jane, undefined);

      expect(updater).toBeCalledTimes(2); // initially and on update
      expect(selector(plumb.state)).toBe(jane);
      expect(plumbSpy).toBeCalledTimes(1);
      expect(selector(plumbSpy.mock.calls[0][0])).toBe(jane);
      expect(personSpy).toBeCalledTimes(1);
      expect(personSpy.mock.calls[0][0]).toBe(jane);
    });

    it('should send tags from tagged nexts to parent subscribers and store the last tag', () => {
      const plumb = createPlumb(initialState);

      const updater = jest.fn((_0, personState) => {
        return {
          people: [personState],
        };
      });

      const spy = jest.fn((_0, _1) => {});
      plumb.subscribe(spy);

      const person = plumb.chain(
        {
          selector,
          updater,
        },
        'chain',
      );
      expect(plumb.lastTag).toBe('chain');

      person.next({ id: '', name: '' }, 'next');

      expect(spy).toBeCalledTimes(2);
      expect(spy.mock.calls[0][1]).toBe('chain');
      expect(spy.mock.calls[1][1]).toBe('next');
      expect(plumb.lastTag).toBe('next');
    });

    it('should call child transformers when sending a value through the parent', () => {
      const plumb = createPlumb(initialState);

      const jane = { id: '2', name: 'Jane' };
      const updater = jest.fn(() => {
        return {
          people: [jane],
        };
      });

      const person = plumb.chain(
        {
          selector,
          updater,
        },
        undefined,
      );

      const plumbSubscriber = jest.fn();
      plumb.subscribe(plumbSubscriber);

      const personSubscriber = jest.fn();
      person.subscribe(personSubscriber);

      plumb.next(
        {
          people: [],
        },
        undefined,
      );

      expect(updater).toBeCalledTimes(2); // initially and on update
      expect(plumbSubscriber).toBeCalledTimes(1);
      expect(plumbSubscriber.mock.calls[0][0]).toEqual({
        people: [jane],
      });
      expect(personSubscriber).toBeCalledTimes(1);
      expect(personSubscriber.mock.calls[0][0]).toBe(jane);
    });

    it('should filter properly and receive tags from parent', () => {
      const plumb = createPlumb(initialState);

      const john = selector(plumb.state);

      const updater = jest.fn((state) => state);
      const person = plumb.chain(
        {
          selector,
          updater,
          filter: (person, tag) => {
            expect(tag).toBe('next');
            return person === john;
          },
        },
        undefined,
      );

      const spy = jest.fn();
      person.subscribe(spy);

      const jane = {
        id: '2',
        name: 'Jane',
      };
      plumb.next(
        {
          people: [jane],
        },
        'next',
      );

      expect(selector(plumb.state)).toBe(jane);

      expect(updater).toBeCalledTimes(2);
      expect(spy).toBeCalledTimes(0);
      expect(person.state).toBe(john);
    });

    it('should skip initial chain transformer', () => {
      const plumb = createPlumb(initialState);

      const updater = jest.fn((state) => state);
      const transformer = jest.fn((selectedState) => selectedState);

      const person = plumb.chain(
        {
          selector,
          updater,
          transformer,
          skipInitialTransform: true,
        },
        undefined,
      );

      person.next(
        {
          id: '2',
          name: 'Jane',
        },
        undefined,
      );

      expect(updater).toBeCalledTimes(2);
      expect(transformer).toBeCalledTimes(1); // on next only
    });

    it('should call chain transformer before the updater', () => {
      const plumb = createPlumb(initialState);

      const order: number[] = [];

      const updater = jest.fn((state) => {
        order.push(2);
        return state;
      });
      const transformer = jest.fn((selectedState) => {
        order.push(1);
        return selectedState;
      });

      const person = plumb.chain(
        {
          selector,
          updater,
          transformer,
        },
        undefined,
      );

      person.next(
        {
          id: '2',
          name: 'Jane',
        },
        undefined,
      );

      expect(order).toEqual([1, 2, 1, 2]);
    });

    describe('dispose', () => {
      it('should properly dispose', () => {
        const plumb = createPlumb(initialState);

        const subscribeSpies = [
          jest.fn((val) => val),
          jest.fn((val) => val),
          jest.fn((val) => val),
        ];
        subscribeSpies.forEach((spy) => {
          plumb.subscribe(spy);
        });

        const plumbSubscriber = { dispose: jest.fn() };
        plumb.subscribe(plumbSubscriber);

        const selectorSpy = jest.fn((val) => val);
        const updaterSpy = jest.fn((val) => val);

        const person = plumb.chain(
          {
            selector: selectorSpy,
            updater: updaterSpy,
          },
          undefined,
        );

        const chainSpies = [
          {
            selector: jest.fn((val) => val),
            updater: jest.fn((val) => val),
          },
          {
            selector: jest.fn((val) => val),
            updater: jest.fn((val) => val),
          },
          {
            selector: jest.fn((val) => val),
            updater: jest.fn((val) => val),
          },
        ];

        chainSpies.forEach((spy) => {
          plumb.chain(spy, undefined);
        });

        const personDisposeSpy = jest.fn();
        person.subscribe({ dispose: personDisposeSpy });

        person.dispose();

        [1, 2, 3].forEach((index) => {
          plumb.next(index as any, undefined);
        });

        expect(plumbSubscriber.dispose).toBeCalledTimes(0);
        expect(selectorSpy).toBeCalledTimes(1);
        expect(updaterSpy).toBeCalledTimes(1);
        expect(plumb.subscribers).toEqual([
          ...subscribeSpies,
          plumbSubscriber,
          ...chainSpies.map(() => expect.any(Function)), // because the pipes have different internal transformers
        ]);
        expect(personDisposeSpy).toBeCalled();
        subscribeSpies.forEach((spy) => {
          expect(spy).toBeCalledTimes(3);
        });
        chainSpies.forEach((spy) => {
          // initial + 3 updates
          expect(spy.selector).toBeCalledTimes(1 + 3);
          expect(spy.updater).toBeCalledTimes(1 + 3);
        });
      });

      it('should dispose child plumbs on parent dispose', () => {
        const plumb = createPlumb(initialState);

        const disposeSpy = jest.fn();

        const person1 = plumb.chain(
          {
            selector,
            updater: () => initialState,
          },
          undefined,
        );
        person1.subscribe({ dispose: disposeSpy });

        const person2 = plumb.chain(
          {
            selector,
            updater: () => initialState,
          },
          undefined,
        );
        person2.subscribe({ dispose: disposeSpy });

        const person3 = plumb.chain(
          {
            selector,
            updater: () => initialState,
          },
          undefined,
        );
        person3.subscribe({ dispose: disposeSpy });

        plumb.dispose();

        expect(disposeSpy).toBeCalledTimes(3);
        expect(() => {
          person1.next(0 as any, undefined);
        }).toThrow();
        expect(() => {
          person2.next(0 as any, undefined);
        }).toThrow();
        expect(() => {
          person3.next(0 as any, undefined);
        }).toThrow();
      });

      it('should have parent state before disposing child plumbs', (done) => {
        const state = {};
        const plumb = createPlumb(state);

        const child = plumb.chain(
          {
            selector: (state) => state,
            updater: (state) => state,
          },
          undefined,
        );

        child.subscribe({
          dispose: () => {
            expect(plumb.state).toBe(state);
            expect(child.state).toBe(plumb.state);
            done();
          },
        });

        plumb.dispose();
      });
    });
  });

  describe('dispose', () => {
    it('should clean the plumb on dispose', () => {
      const plumb = createPlumb('');

      const subscribeSpy = jest.fn();
      plumb.subscribe(subscribeSpy);

      const disposeSpy = jest.fn();
      plumb.subscribe({
        dispose: disposeSpy,
      });

      plumb.dispose();

      expect(subscribeSpy).toBeCalledTimes(0);
      expect(disposeSpy).toBeCalledTimes(1);

      expect(() => {
        plumb.state;
      }).toThrow();
      expect(() => {
        plumb.lastTag;
      }).toThrow();
      expect(() => {
        plumb.subscribers;
      }).toThrow();
      expect(() => plumb.chain({ selector: () => {}, updater: () => '' }, undefined)).toThrow();
      expect(() => plumb.next('', undefined)).toThrow();
      expect(() => plumb.subscribe(() => {})).toThrow();
      expect(() => plumb.dispose()).toThrow();
    });

    it('should still have state for dispose subscribers', (done) => {
      const state = {};
      const plumb = createPlumb(state);

      plumb.subscribe({
        dispose: () => {
          expect(plumb.state).toBe(state);
          done();
        },
      });

      plumb.dispose();
    });

    it('should flag as disposed when disposed', () => {
      const state = {};
      const plumb = createPlumb(state);
      plumb.dispose();
      expect(plumb.disposed).toBeTruthy();
    });
  });
});
