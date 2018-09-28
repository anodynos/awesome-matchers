import { awesomeMatchersConfig, is, isnt } from './utils/specHelpers';
import { theAnswerToLife } from './fixtures/_fixtures';
import { expect } from 'chai';

awesomeMatchersConfig.testRuntime = 'chai';

describe("IsItChaiSpec", () => {
  it("itIs_itIsnt_shouldPass", () => {
    expect(42).to.be.equal(theAnswerToLife);
    is(42, theAnswerToLife);
    isnt(84, theAnswerToLife);
  });
  it("itIs_shouldFail", () => {
    is(84, theAnswerToLife);
  });
  it("itIsnt_shouldFail", () => {
    isnt(42, theAnswerToLife);
  });
});

