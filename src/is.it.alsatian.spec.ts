import {
  Test,
  TestFixture,
} from 'alsatian';
import { awesomeMatchersConfig, is, isnt } from './utils/specHelpers';
import { theAnswerToLife } from './fixtures/_fixtures';

awesomeMatchersConfig.testRuntime = 'alsatian';

@TestFixture()
export class IsItAlsatianSpec {
  
  @Test()
  itIs_itIsnt_shouldPass() {
    is(42, theAnswerToLife);
    isnt(84, theAnswerToLife);
  }
  
  @Test()
  itIs_shouldFail() {
    is(84, theAnswerToLife);
  }
  
  @Test()
  itIsnt_shouldFail() {
    isnt(42, theAnswerToLife);
  }
}
