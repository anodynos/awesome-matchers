import {
  Expect,
  Test,
  TestFixture,
} from 'alsatian';
import { theAnswerToLife } from './fixtures/_fixtures';
import { awesomeMatchersConfig } from './utils/specHelpers';

awesomeMatchersConfig.testRuntime = 'alsatian';

@TestFixture()
export class IsExpectAlsatianSpec {
  //@todo: make `is` & `isnt` aliases to toBe & not.toBe
  
  @Test()
  itIs_itIsnt_shouldPass() {
    Expect(theAnswerToLife).toBe(42);
    Expect(theAnswerToLife).not.toBe(84);
  }
  
  @Test()
  itIs_shouldFail() {
    Expect(theAnswerToLife).toBe(84);
  }
  
  @Test()
  itIsnt_shouldFail() {
    Expect(theAnswerToLife).not.toBe(42);
  }
}
