import * as _ from 'lodash';
import * as _B from 'uberscore';
import {
  Expect,
  FocusTest,
  FocusTests,
  IgnoreTest,
  Test,
  TestFixture,
} from 'alsatian';
import {
  isEqual,
  isLike,
  isntLike,
  isntEqual,
  iamLike,
  iamNotLike,
  awesomeMatchersConfig,
} from '../awesomeMatchers';
import { john, john2, johnLike, maria } from '../fixtures/_fixtures';
import { alsatianAdaptor } from '../adaptors/alsatianAdaptor';

awesomeMatchersConfig.matchAdaptor = alsatianAdaptor;

@TestFixture()
// @FocusTests
// @IgnoreTests()
export class LikeAlsatianShowSpec {
  @Test()
  // @IgnoreTest()
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
  // @IgnoreTest()
  expectIsLike_shouldFail() {
    Expect(_B.isLike(maria, john)).toBe(true);
  }

  @Test()
  itIsLike_shouldFail() {
    isLike(maria, john);
  }

  @Test()
  // @IgnoreTest()
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
