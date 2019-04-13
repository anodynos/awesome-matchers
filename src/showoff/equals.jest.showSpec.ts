import { awesomeMatchersConfig, isEqual, isntEqual } from '../awesomeMatchers';
import { john, john2, maria } from '../fixtures/_fixtures';
import { jestAdaptor } from '../adaptors/jestAdaptor';

awesomeMatchersConfig.matchAdaptor = jestAdaptor;

describe('EqualsJestShowSpec', () => {
  describe('isEquals_isntEqual_shouldPass', () => {
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
