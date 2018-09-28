import {
  AsyncSetup,
  AsyncTeardown,
  AsyncTest,
  Expect, FocusTest, FocusTests,
  IgnoreTest, IgnoreTests, Setup, Test,
  TestFixture,
} from 'alsatian';
import { equals, notEquals } from './utils/specHelpers';
import { john, john2, maria } from './fixtures/_fixtures';
import * as _ from 'lodash';
import * as _B from 'uberscore';

@TestFixture()
// @FocusTests
// @IgnoreTests()
export class EqualsItAlsatianSpec {
  
  @Test()
  itEquals_ItNotEquals_shouldPass() {
    equals(john2, john, );
    notEquals(maria, john, );
  }

  @Test()
  itEquals_shouldFail() {
    equals(maria, john, );
  }

  @Test()
  // @FocusTest
  itNotEquals_shouldFail() {
    notEquals( john2, john);
    // @todo: get rid of
    // data:
    //  got: undefined
    //  expect: undefined
  }
}
