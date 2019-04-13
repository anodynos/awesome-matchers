import { awesomeMatchersConfig, is, isnt } from '../awesomeMatchers';
import { theAnswerToLife } from '../fixtures/_fixtures';
import { jestAdaptor } from '../adaptors/jestAdaptor';

awesomeMatchersConfig.matchAdaptor = jestAdaptor;

describe('IsJestShowSpec', () => {
  describe('is_isnt_shouldPass', () => {
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
