import * as _ from 'lodash';
import * as _B from 'uberscore';

import {
  awesomeMatchersConfig,
  equalSet,
  notEqualSet,
} from '../awesomeMatchers';
import { john, john2, johnLike, maria } from '../fixtures/_fixtures';
import { jestAdaptor } from '../adaptors/jestAdaptor';

awesomeMatchersConfig.matchAdaptor = jestAdaptor;

describe.only('EqualSetJestShowSpec', () => {
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
