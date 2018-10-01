import { Expect, FocusTest, FocusTests, Test, TestFixture } from 'alsatian';
import { awesomeMatchersConfig, is, isnt } from '../awesomeMatchers';
import { theAnswerToLife } from '../fixtures/_fixtures';
import { alsatianAdaptor } from '../adaptors/alsatianAdaptor';

awesomeMatchersConfig.matchAdaptor = alsatianAdaptor;

@TestFixture()
// @FocusTests
export class IsAlsatianShowSpec {
  //@todo: make `is` & `isnt` aliases to toBe & not.toBe

  @Test()
  expectIs_itIsnt_shouldPass() {
    Expect(42).toBe(theAnswerToLife);
    Expect(84).not.toBe(theAnswerToLife);
  }

  @Test()
  itIs_itIsnt_shouldPass() {
    is(42, theAnswerToLife);
    isnt(84, theAnswerToLife);
  }

  @Test()
  expectIs_shouldFail() {
    Expect(84).toBe(theAnswerToLife);
  }

  @Test()
  // @FocusTest
  itIs_shouldFail() {
    is(84, theAnswerToLife);
  }

  @Test()
  expectIsnt_shouldFail() {
    Expect(42).not.toBe(theAnswerToLife);
  }

  @Test()
  itIsnt_shouldFail() {
    isnt(42, theAnswerToLife);
  }
}
