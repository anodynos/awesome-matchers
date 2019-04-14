import { Expect, FocusTest, FocusTests, Test, TestFixture } from 'alsatian';
import { AwesomeMatchers } from '../awesomeMatchers';
import { alsatianAdaptor as matchAdaptor } from '../adaptors/alsatianAdaptor';

const { isEqual, isntEqual } = new AwesomeMatchers({ matchAdaptor });

import { john, john2, maria } from '../fixtures/_fixtures';

@TestFixture()
export class EqualsAlsatianShowSpec {
  @Test()
  expectIsEqual_ItIsntEqual_shouldPass() {
    Expect(john2).toEqual(john);
    Expect(maria).not.toEqual(john);
  }

  @Test()
  itIsEqual_ItIsntEqual_shouldPass() {
    isEqual(john2, john);
    isntEqual(maria, john);
  }

  @Test()
  expectIsEqual_shouldFail() {
    Expect(maria).toEqual(john);
  }

  @Test()
  itIsEqual_shouldFail() {
    isEqual(maria, john);
  }

  @Test()
  expectIsntEqual_shouldFail() {
    Expect(john2).not.toEqual(john);
  }

  @Test()
  itIsntEqual_shouldFail() {
    isntEqual(john2, john);
    // @todo: get rid of
    // data:
    //  got: undefined
    //  expect: undefined
  }
}
