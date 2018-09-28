import * as _ from 'lodash';
import * as _B from 'uberscore';
import {
  AsyncSetup,
  AsyncTeardown,
  AsyncTest,
  Expect,
  FocusTests,
  IgnoreTest,
  IgnoreTests,
  Setup,
  Test,
  TestFixture,
} from 'alsatian';
import { isEqual, isLike, isntLike, isntEqual, iamLike, iamNotLike } from '../awesomeMatchers';
import { john, john2, johnLike, maria } from '../fixtures/_fixtures';

@TestFixture()
@FocusTests
// @IgnoreTests()
export class LikeAlsatianShowSpec {
  
  @Test()
  expectIsLike_shouldPass() {
    Expect(_B.isLike(johnLike, john2)).toBe(true);
    Expect(_.flip(_B.isLike)(john2, johnLike)).toBe(true);

    Expect(_B.isLike(maria, john)).toBe(false);
    Expect(_.flip(_B.isLike)(john, maria)).toBe(false);
  }

  @Test()
  itIsLike_shouldPass() {
    isLike(johnLike, john2);
    iamLike(john2, johnLike);
    isntLike(maria, john);
    iamNotLike(john, maria);
  }

  @Test()
  expectIsLike_shouldFail() {
    Expect(_B.isLike(maria, john)).toBe(true);
  }
  
  @Test()
  itIsLike_shouldFail() {
    isLike(maria, john);
  }

  @Test()
  expectIsntLike_shouldFail() {
    Expect(_B.isLike(johnLike, john)).toBe(false);
  }
  
  @Test()
  itIsntLike_shouldFail() {
    isntLike(johnLike, john);
    // @todo: get rid of
    // data:
    //  got: undefined
    //  expect: undefined
  }
}
