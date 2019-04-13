import * as _B from 'uberscore';

import { awesomeMatchersConfig, isLike, isntLike } from '../awesomeMatchers';
import { john, john2, johnLike, maria } from '../fixtures/_fixtures';
import { jestAdaptor } from '../adaptors/jestAdaptor';

awesomeMatchersConfig.matchAdaptor = jestAdaptor;

describe('LikeJestShowSpec', () => {
  describe('isLike_isntLike_shouldPass', () => {
    it('jest.expect', () => {
      expect(_B.isLike(johnLike, john)).toBe(true);
      expect(_B.isLike(maria, john)).toBe(false);
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

  describe.only('isntLike_shouldFail', () => {
    it('jest.expect', () => {
      expect(john).not.toEqual(expect.objectContaining(johnLike));
    });

    it('awesomeMatchers', () => {
      isntLike(johnLike, john);
    });
  });
});
