import { awesomeMatchersConfig, is, isnt } from '../awesomeMatchers';
import { equals, notEquals } from '../awesomeMatchers';
import { john, john2, maria } from '../fixtures/_fixtures';

awesomeMatchersConfig.testRuntime = 'chai';

describe("EqualsChaiShowSpec", () => {
  it("itEquals_ItNotEquals_shouldPass", () => {
    equals(john2, john, );
    notEquals(maria, john, );
  });
  it("itEquals_shouldFail", () => {
    equals(maria, john, );
  });
  it("itNotEquals_shouldFail", () => {
    notEquals( john2, john);
  });
});
