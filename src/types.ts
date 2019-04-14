export interface IAwesomeMatchersConfig {
  matchAdaptor: IMatchAdaptor; // initially null, but must be configured
}

export interface IMatchResult {
  // @todo <T>
  isPassed: boolean;
  shouldMatch: boolean;
  isMatch: boolean;
  op: string; // @todo: enum it
  name: string;
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

// Refactor to more specifics
export interface IMatchAdaptor {
  adaptorName: string;
  generic: (matchResult: IMatchResult) => void;
  is: (actual, expected) => void;
  isnt: (actual, expected) => void;
  ok: (actual) => void;
  notOk: (actual) => void;
  tru: (actual) => void;
  fals: (actual) => void;
  isEqual?: (actual, expected) => void;
  isntEqual?: (actual, expected) => void;
  isLike?: (actual, expected) => void;
  isntLike?: (actual, expected) => void;
}
/*
  //Add those ?
  equalSet = createEqualSet();
  notEqualSet = createEqualSet(false);
  isntEqual = are('isEqual', 'isntEqual', false);
  isExact = are('isExact');
  isntExact = are('isExact', 'isntExact', false);
  isIqual = are('isIqual');
  isntIqual = are('isIqual', 'isntIqual', false);
  isIxact = are('isIxact');
  isntIxact = are('isIxact', 'isntIxact', false);
  iamNotLike = _.flip(are('isLike', 'iamNotLike', false, true));
*/
