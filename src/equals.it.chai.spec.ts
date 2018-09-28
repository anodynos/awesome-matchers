import { awesomeMatchersConfig, is, isnt } from './utils/specHelpers';
import { equals, notEquals } from './utils/specHelpers';
import { john, john2, maria } from './fixtures/_fixtures';

awesomeMatchersConfig.testRuntime = 'chai';

describe("EqualsItChaiSpec", () => {
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
