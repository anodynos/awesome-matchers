import { expect } from 'chai';
import { awesomeMatchersConfig, isEqual, isntEqual } from '../awesomeMatchers';
import { john, john2, maria } from '../fixtures/_fixtures';
import { chaiAdaptor } from '../adaptors/chaiAdaptor';

awesomeMatchersConfig.matchAdaptor = chaiAdaptor;

describe('EqualsChaiShowSpec', () => {
  describe('isEquals_isntEqual_shouldPass', () => {
    it('chai.expect', () => {
      expect(john2).to.be.deep.equal(john);
      expect(maria).to.not.be.deep.equal(john);
    });

    it('awesomeMatchers', () => {
      isEqual(john2, john);
      isntEqual(maria, john);
    });
  });

  describe('isEqual_shouldFail', () => {
    it('chai.expect', () => {
      expect(maria).to.be.deep.equal(john);
    });

    it('awesomeMatchers', () => {
      isEqual(maria, john);
    });
  });

  describe('isntEqual_shouldFail', () => {
    it('chai.expect', () => {
      expect(john2).to.not.be.deep.equal(john);
    });

    it('awesomeMatchers', () => {
      isntEqual(john2, john);
    });
  });
});
