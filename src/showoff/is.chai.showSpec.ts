import { awesomeMatchersConfig, is, isnt } from '../awesomeMatchers';
import { theAnswerToLife } from '../fixtures/_fixtures';
import { expect } from 'chai';

awesomeMatchersConfig.testRuntime = 'chai';

describe('IsChaiShowSpec', () => {
  it('expectIs_itIsnt_shouldPass', () => {
    expect(42).to.be.equal(theAnswerToLife);
    expect(84).to.not.be.equal(theAnswerToLife);
  });

  it('itIs_itIsnt_shouldPass', () => {
    is(42, theAnswerToLife);
    isnt(84, theAnswerToLife);
  });

  it('expectIs_shouldFail', () => {
    expect(84).to.be.equal(theAnswerToLife);
  });

  it('itIs_shouldFail', () => {
    is(84, theAnswerToLife);
  });

  it('expectIsnt_shouldFail', () => {
    expect(42).to.not.be.equal(theAnswerToLife);
  });

  it('itIsnt_shouldFail', () => {
    isnt(42, theAnswerToLife);
  });
});
