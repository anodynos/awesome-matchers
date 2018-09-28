import {
  Expect,
  Test,
  TestFixture,
} from 'alsatian';

// own
import { awesomeMatchersConfig, isEqual, isntEqual } from '../awesomeMatchers';
import { alsatianAdaptor } from '../adaptors';

// data
import { john, john2, maria } from '../fixtures/_fixtures';

awesomeMatchersConfig.matchAdaptor = alsatianAdaptor;

@TestFixture()
// @FocusTests
// @IgnoreTests()
export class EqualsAlsatianShowSpec {
  
  @Test()
  expectIsEqual_ItIsntEqual_shouldPass() {
    Expect(john2).toEqual(john);
    Expect(maria).not.toEqual(john);
  }
  
  @Test()
  itIsEqual_ItIsntEqual_shouldPass() {
    isEqual(john2, john, );
    isntEqual(maria, john, );
  }

  @Test()
  expectIsEqual_shouldFail() {
    Expect(maria).toEqual(john);
  }

  @Test()
  itIsEqual_shouldFail() {
    isEqual(maria, john, );
  }

  @Test()
  expectIsntEqual_shouldFail() {
    Expect( john2).not.toEqual(john);
  }
  
  @Test()
  itIsntEqual_shouldFail() {
    isntEqual( john2, john);
    // @todo: get rid of
    // data:
    //  got: undefined
    //  expect: undefined
  }
}
