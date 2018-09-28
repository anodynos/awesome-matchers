import { Expect, Test, TestFixture } from 'alsatian';
import { awesomeMatchersConfig, is, isnt } from '../awesomeMatchers';
import { theAnswerToLife } from '../fixtures/_fixtures';

awesomeMatchersConfig.testRuntime = 'alsatian';

@TestFixture()
export class IsAlsatianShowSpec {
  //@todo: make `is` & `isnt` aliases to toBe & not.toBe

  @Test()
  expectIs_itIsnt_shouldPass() {
    Expect(theAnswerToLife).toBe(42);
    Expect(theAnswerToLife).not.toBe(84);
  }

  @Test()
  itIs_itIsnt_shouldPass() {
    is(42, theAnswerToLife);
    isnt(84, theAnswerToLife);
  }

  @Test()
  expectIs_shouldFail() {
    Expect(theAnswerToLife).toBe(84);
  }

  @Test()
  itIs_shouldFail() {
    is(84, theAnswerToLife);
  }

  @Test()
  expectIsnt_shouldFail() {
    Expect(theAnswerToLife).not.toBe(42);
  }

  @Test()
  itIsnt_shouldFail() {
    isnt(42, theAnswerToLife);
  }
}
