import * as _ from 'lodash';
import * as _B from 'uberscore';
import {
  john,
  john2,
  johnLike,
  maria,
  theAnswerToLife,
} from '../fixtures/_fixtures';
import { AwesomeMatchers, jestAdaptor as matchAdaptor } from '..';
const {
  is,
  isnt,
  ok,
  notOk,
  tru,
  fals,
  equalSet,
  notEqualSet,
  isEqual,
  isntEqual,
  isLike,
  isntLike,
} = new AwesomeMatchers({
  matchAdaptor,
});

describe('jest showSpec', () => {
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

  describe('fals', () => {
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

  describe('tru', () => {
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

  describe('is/isnt', () => {
    describe('shouldPass', () => {
      it('jest.expect', () => {
        expect(42).toBe(theAnswerToLife);
        expect(84).not.toBe(theAnswerToLife);
      });

      it('awesomeMatchers', () => {
        is(42, theAnswerToLife);
        isnt(84, theAnswerToLife);
      });
    });

    describe('is_shouldFail', () => {
      it('jest.expect', () => {
        expect(84).toBe(theAnswerToLife);
      });

      it('awesomeMatchers', () => {
        is(84, theAnswerToLife);
      });
    });

    describe('isnt_shouldFail', () => {
      it('jest.expect', () => {
        expect(42).not.toBe(theAnswerToLife);
      });

      it('awesomeMatchers', () => {
        isnt(42, theAnswerToLife);
      });
    });
  });

  describe('isEquals/isntEqual_', () => {
    describe('shouldPass', () => {
      it('jest.expect', () => {
        expect(john2).toEqual(john);
        expect(maria).not.toEqual(john);
      });

      it('awesomeMatchers', () => {
        isEqual(john2, john);
        isntEqual(maria, john);
      });
    });

    describe('isEqual_shouldFail', () => {
      it('jest.expect', () => {
        expect(maria).toEqual(john);
      });

      it('awesomeMatchers', () => {
        isEqual(maria, john);
      });
    });

    describe('isntEqual_shouldFail', () => {
      it('jest.expect', () => {
        expect(john2).not.toEqual(john);
      });

      it('awesomeMatchers', () => {
        isntEqual(john2, john);
      });
    });
  });

  describe('isLike/isntLike', () => {
    describe('shouldPass', () => {
      it('jest.expect', () => {
        expect(john).toEqual(expect.objectContaining(johnLike));
        expect(maria).not.toEqual(expect.objectContaining(johnLike));
      });

      it('awesomeMatchers', () => {
        isLike(johnLike, john);
        isntLike(maria, john);
      });
    });

    describe('isLike_shouldFail', () => {
      it('jest.expect', () => {
        expect(maria).toEqual(expect.objectContaining(john));
      });

      it('awesomeMatchers', () => {
        isLike(maria, john);
      });
    });

    describe('isntLike_shouldFail', () => {
      it('jest.expect', () => {
        expect(john).not.toEqual(expect.objectContaining(johnLike));
      });

      it('awesomeMatchers', () => {
        isntLike(johnLike, john);
      });
    });
  });

  describe('equalSet', () => {
    describe('shouldPass', () => {
      it('byStrictEquality', () => {
        equalSet([1, 2, john, 3], [3, john, 2, 1]);
      });
      it('byDeepEquality', () => {
        equalSet(
          [{ a: 1 }, { b: 2 }, { c: 3 }, john],
          [{ c: 3 }, { b: 2 }, { a: 1 }, john2],
          _.isEqual,
        );
      });

      it('byLikeEquality', () => {
        equalSet(
          [{ a: 1 }, { b: 2 }, { c: 3 }, johnLike],
          [
            { c: 3, cc: 'ignored by like' },
            { b: 2 },
            { a: 1, aa: 'I dont matter!' },
            john,
          ],
          _B.isLike,
        );
      });
    });

    describe('shouldFail', () => {
      it('byStrictEquality', () => {
        equalSet([1, 2, 3, johnLike], [3, 2, 1, 4, john], _B.isLike);
      });
      it('byDeepEquality', () => {
        equalSet(
          [{ a: 1 }, { b: 2 }, { c: 3 }, john],
          [{ c: 3 }, { b: 2 }, { a: 1 }, maria],
          _.isEqual,
        );
      });

      it('byLikeEquality', () => {
        equalSet(
          [
            { a: 1, aa: 'I am different to normal "a" !' },
            { b: 2 },
            { c: 3 },
            johnLike,
          ],
          [{ c: 3 }, { b: 2 }, { a: 1 }, john],
          _B.isLike,
        );
      });
    });
  });
});
