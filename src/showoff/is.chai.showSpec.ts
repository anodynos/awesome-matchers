import { awesomeMatchersConfig, is, isnt } from '../awesomeMatchers';
import { theAnswerToLife } from '../fixtures/_fixtures';
import { expect } from 'chai';
import { chaiAdaptor } from '../adaptors';

awesomeMatchersConfig.matchAdaptor = chaiAdaptor;

describe('IsChaiShowSpec', () => {
  describe('is_isnt_shouldPass', () => {
    it('chai.expect', () => {
      expect(42).to.be.equal(theAnswerToLife);
      expect(84).to.not.be.equal(theAnswerToLife);
    });

    it('awesomeMatchers', () => {
      is(42, theAnswerToLife);
      isnt(84, theAnswerToLife);
    });
  });

  describe('is_shouldFail', () => {
    it('chai.expect', () => {
      expect(84).to.be.equal(theAnswerToLife);
    });

    it('awesomeMatchers', () => {
      is(84, theAnswerToLife);
    });
  });

  describe('isnt_shouldFail', () => {
    it('chai.expect', () => {
      expect(42).to.not.be.equal(theAnswerToLife);
    });

    it('awesomeMatchers', () => {
      isnt(42, theAnswerToLife);
    });
  });
});
