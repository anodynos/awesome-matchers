import { Expect } from 'alsatian';
import * as _ from 'lodash';

export interface IAwesomeMatchersConfig {
  matchAdaptor: IMatchAdaptor; // initially null, but must be configured
}

export interface IMatchResult {
  // @todo <T>
  isPassed: boolean;
  shouldMatch: boolean;
  isMatch: boolean;

  title: string;
  explain: string;
  // whether to use the left & right values or just ignore them (all info is in the message)
  useValues: boolean;
  // eg the left value, such as 'actual' or 'got' in alsatian
  leftName?: string;
  // eg the right value, such as ''expected' in mocha or ''expect' in alsatian
  rightName?: string;

  // Values might be the original whole value of comparison
  // or just an extract from them, eg:
  //  - a specific path's value
  //  - a _.difference or a _.type etc
  leftValue?: any; // eg the value we got as different @todo TReturn;
  rightValue?: any; // eg the value we expected @todo TReturn;

  actual?: any; // @todo: TActual
  expected?: any; // @todo: TExpected
}

export type IMatchAdaptor = (matchResult: IMatchResult) => void;

// Refactor to more specifics
//
// export interface IMatchAdaptor {
//   generic: (matchResult: IMatchResult) => void;
//   is?: (matchResult: IMatchResult) => void;
//   isnt?: (matchResult: IMatchResult) => void;
/*
  //Add all those
  
  ok = a => Expect(a).toBeTruthy();
  notOk = a => Expect(a).not.toBeTruthy();
  tru = a => Expect(a).toBe(true);
  fals = a => Expect(a).toBe(false);
  
  equalSet = createEqualSet();
  notEqualSet = createEqualSet(false);
  
  isEqual = are('isEqual');
  isntEqual = are('isEqual', 'isntEqual', false);
  isExact = are('isExact');
  isntExact = are('isExact', 'isntExact', false);
  isIqual = are('isIqual');
  isntIqual = are('isIqual', 'isntIqual', false);
  isIxact = are('isIxact');
  isntIxact = are('isIxact', 'isntIxact', false);
  isLike = are('isLike');
  isntLike = are('isLike', 'isntLike', false);
  
  iamLike = _.flip(are('isLike', 'iamLike', true, true));
  iamNotLike = _.flip(are('isLike', 'iamNotLike', false, true));
   */
// }
