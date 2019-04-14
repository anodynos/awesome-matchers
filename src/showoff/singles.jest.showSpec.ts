import {
  awesomeMatchersConfig,
  fals,
  notOk,
  ok,
  tru,
} from '../awesomeMatchers';

import { jestAdaptor } from '../adaptors/jestAdaptor';

awesomeMatchersConfig.matchAdaptor = jestAdaptor;

describe('IsJestShowSpec', () => {
  describe('ok', () => {
    describe('shouldPass', () => {
      it('jest.expect', () => {
        expect('some value').toBeTruthy();
        expect(1).toBeTruthy();
        expect({}).toBeTruthy();
      });

      it('awesomeMatchers', () => {
        ok('some value');
        ok(1);
        ok({});
      });
    });

    describe('shouldFail', () => {
      it('jest.expect', () => {
        expect('').toBeTruthy();
      });

      describe('awesomeMatchers', () => {
        it('empty string', () => ok(''));
        it('false', () => ok(false));
        it('zero', () => ok(0));
      });
    });
  });

  describe('notOk', () => {
    describe('shouldPass', () => {
      it('jest.expect', () => {
        expect('').not.toBeTruthy();
        expect(0).not.toBeTruthy();
      });

      describe('awesomeMatchers', () => {
        it('empty string', () => notOk(''));
        it('zero', () => notOk(0));
      });
    });

    describe('shouldFail', () => {
      it('jest.expect', () => {
        expect('some value').not.toBeTruthy();
      });

      it('awesomeMatchers', () => {
        notOk('some value');
      });
    });
  });

  describe('false', () => {
    describe('shouldPass', () => {
      it('jest.expect', () => {
        expect(false).toBe(false);
      });

      it('awesomeMatchers', () => {
        fals(false);
      });
    });

    describe('shouldFail', () => {
      it('jest.expect', () => {
        expect('not a false value').toBe(false);
      });

      it('awesomeMatchers', () => {
        fals('not a false value');
      });
    });
  });

  describe('true', () => {
    describe('shouldPass', () => {
      it('jest.expect', () => {
        expect(true).toBe(true);
      });

      it('awesomeMatchers', () => {
        tru(true);
      });
    });

    describe('shouldFail', () => {
      it('jest.expect', () => {
        expect('not a true value').toBe(false);
      });

      it('awesomeMatchers', () => {
        fals('not a false value');
      });
    });
  });
});
