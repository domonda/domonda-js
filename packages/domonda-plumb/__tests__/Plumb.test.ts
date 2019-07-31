import { createPlumb } from '../src/createPlumb';

describe('Plumb', () => {
  describe('create', () => {
    it('should initialize with state', () => {
      const plumb = createPlumb('');

      expect(plumb.state).toBe('');
    });
  });

  describe('subscribe', () => {
    it('should not be notified with initial state', () => {
      const plumb = createPlumb('');

      const spy = jest.fn();

      plumb.subscribe(spy);

      expect(spy).toBeCalledTimes(0);
    });

    it('should serve current subscribers through subscribers', () => {
      const plumb = createPlumb('');

      const spy1 = jest.fn();
      const spy2 = jest.fn();

      plumb.subscribe(spy1);
      plumb.subscribe(spy2);

      expect(plumb.subscribers).toEqual([spy1, spy2]);
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
          plumb.next(index.toString());
        });

        expect(plumb.subscribers).toEqual([...others, ...others]);
        expect(spy).toBeCalledTimes(0);
      });
    });
  });

  describe('handler', () => {
    it('should call the handler first, then subscribers when using next', () => {
      const handledState = { second: 2 };
      const handler = jest.fn((_0) => handledState);

      const plumb = createPlumb({}, { handler });

      const subscriber = jest.fn();
      plumb.subscribe(subscriber);

      const nextState = { first: 1 };
      plumb.next(nextState);

      expect(handler).toBeCalledTimes(1);
      expect(handler.mock.calls[0][0]).toBe(nextState);

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

      const person = plumb.chain({
        selector,
        updater: () => initialState,
      });

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

      const person = plumb.chain({
        selector,
        updater: () => {
          return {
            people: [jane],
          };
        },
      });
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
      const person = plumb.chain({
        selector,
        updater,
      });

      const plumbSpy = jest.fn((_0) => {});
      plumb.subscribe(plumbSpy);

      const jane = {
        id: '2',
        name: 'Jane',
      };

      const personSpy = jest.fn((_0) => {});
      person.subscribe(personSpy);

      person.next(jane);

      expect(updater).toBeCalledTimes(2); // initially and on update
      expect(selector(plumb.state)).toBe(jane);
      expect(plumbSpy).toBeCalledTimes(1);
      expect(selector(plumbSpy.mock.calls[0][0])).toBe(jane);
      expect(personSpy).toBeCalledTimes(1);
      expect(personSpy.mock.calls[0][0]).toBe(jane);
    });

    it('should call child handlers when sending a value through the parent', () => {
      const plumb = createPlumb(initialState);

      const jane = { id: '2', name: 'Jane' };
      const updater = jest.fn(() => {
        return {
          people: [jane],
        };
      });

      const person = plumb.chain({
        selector,
        updater,
      });

      const plumbSubscriber = jest.fn();
      plumb.subscribe(plumbSubscriber);

      const personSubscriber = jest.fn();
      person.subscribe(personSubscriber);

      plumb.next({
        people: [],
      });

      expect(updater).toBeCalledTimes(2); // initially and on update
      expect(plumbSubscriber).toBeCalledTimes(1);
      expect(plumbSubscriber.mock.calls[0][0]).toEqual({
        people: [jane],
      });
      expect(personSubscriber).toBeCalledTimes(1);
      expect(personSubscriber.mock.calls[0][0]).toBe(jane);
    });

    it('should filter properly', () => {
      const plumb = createPlumb(initialState);

      const john = selector(plumb.state);

      const updater = jest.fn((state) => state);
      const person = plumb.chain({
        selector,
        updater,
        filter: (person) => person === john,
      });

      const spy = jest.fn();
      person.subscribe(spy);

      const jane = {
        id: '2',
        name: 'Jane',
      };
      plumb.next({
        people: [jane],
      });

      expect(selector(plumb.state)).toBe(jane);

      expect(updater).toBeCalledTimes(2);
      expect(spy).toBeCalledTimes(0);
      expect(person.state).toBe(john);
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
        const person = plumb.chain({
          selector: selectorSpy,
          updater: updaterSpy,
        });

        const pipeSpies = [
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
        pipeSpies.forEach((spy) => {
          plumb.chain(spy);
        });

        const personDisposeSpy = jest.fn();
        person.subscribe({ dispose: personDisposeSpy });

        person.dispose();

        [1, 2, 3].forEach((index) => {
          plumb.next(index as any);
        });

        expect(plumbSubscriber.dispose).toBeCalledTimes(0);
        expect(selectorSpy).toBeCalledTimes(1);
        expect(updaterSpy).toBeCalledTimes(1);
        expect(plumb.subscribers).toEqual([
          ...subscribeSpies,
          plumbSubscriber,
          ...pipeSpies.map(() => expect.any(Function)), // because the pipes have different internal handlers
        ]);
        expect(personDisposeSpy).toBeCalled();
        subscribeSpies.forEach((spy) => {
          expect(spy).toBeCalledTimes(3);
        });
        pipeSpies.forEach((spy) => {
          // initial + 3 updates
          expect(spy.selector).toBeCalledTimes(1 + 3);
          expect(spy.updater).toBeCalledTimes(1 + 3);
        });
      });

      it('should dispose child plumbs on parent dispose', () => {
        const plumb = createPlumb(initialState);

        const disposeSpy = jest.fn();

        const person1 = plumb.chain({
          selector,
          updater: () => initialState,
        });
        person1.subscribe({ dispose: disposeSpy });

        const person2 = plumb.chain({
          selector,
          updater: () => initialState,
        });
        person2.subscribe({ dispose: disposeSpy });

        const person3 = plumb.chain({
          selector,
          updater: () => initialState,
        });
        person3.subscribe({ dispose: disposeSpy });

        plumb.dispose();

        expect(disposeSpy).toBeCalledTimes(3);
        expect(() => {
          person1.next(0 as any);
        }).toThrow();
        expect(() => {
          person2.next(0 as any);
        }).toThrow();
        expect(() => {
          person3.next(0 as any);
        }).toThrow();
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
        plumb.subscribers;
      }).toThrow();
      expect(() => plumb.chain({ selector: () => {}, updater: () => '' })).toThrow();
      expect(() => plumb.next('')).toThrow();
      expect(() => plumb.subscribe(() => {})).toThrow();
      expect(() => plumb.dispose()).toThrow();
    });
  });
});
