import * as _ from 'lodash';
import * as _B from 'uberscore';

import {
  awesomeMatchersConfig,
  equalSet, notEqualSet,
} from '../awesomeMatchers';
import { john, john2, johnLike, maria } from '../fixtures/_fixtures';
import { chaiAdaptor } from '../adaptors/chaiAdaptor';

awesomeMatchersConfig.matchAdaptor = chaiAdaptor;

describe('EqualSetChaiShowSpec', () => {
  it('equalSet_byStrictEquality_shouldPass', () => {
    equalSet([1, 2, john, 3], [3, john, 2, 1]);
  });
  
  it('equalSet_byDeepEquality_shouldPass', () => {
    equalSet(
      [{ a: 1 }, { b: 2 }, { c: 3 }, john],
      [{ c: 3 }, { b: 2 }, { a: 1 }, john2],
      _.isEqual,
    );
  });

  it('equalSet_byLikeEquality_shouldPass', () => {
    equalSet(
      [{ a: 1 }, { b: 2 }, { c: 3 }, johnLike],
      [{ c: 3 }, { b: 2 }, { a: 1, aa: 'I dont matter!'}, john],
      _B.isLike,
    );
  });
  
  it('equalSet_byStrictEquality_shouldFail', () => {
    equalSet([1, 2, 3, johnLike], [3, 2, 1, 4, john], _B.isLike);
  });
});
