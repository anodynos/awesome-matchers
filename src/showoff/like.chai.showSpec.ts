import { expect } from 'chai';
import * as _B from 'uberscore';

import { awesomeMatchersConfig, isLike, isntLike } from '../awesomeMatchers';
import { john, john2, johnLike, maria } from '../fixtures/_fixtures';
import { chaiAdaptor } from '../adaptors/chaiAdaptor';

awesomeMatchersConfig.matchAdaptor = chaiAdaptor;

describe('EqualsChaiShowSpec', () => {
  describe('isLike_isntLike_shouldPass', () => {
    it('chai.expect', () => {
      expect(_B.isLike(johnLike, john)).to.be.true;
      expect(_B.isLike(maria, john)).to.be.false;
    });

    it('awesomeMatchers', () => {
      isLike(johnLike, john);
      isntLike(maria, john);
    });
    
  });

  describe('isLike_shouldFail', () => {
    it('chai.expect', () => {
      expect(_B.isLike(maria, john)).to.be.true;
    });

    it('awesomeMatchers', () => {
      isLike(maria, john);
    });
  });

  describe('isntLike_shouldFail', () => {
    it('chai.expect', () => {
      expect(_B.isLike(johnLike, john)).to.be.false;
    });

    it('awesomeMatchers', () => {
      isntLike(johnLike, john);
    });
  });
});
