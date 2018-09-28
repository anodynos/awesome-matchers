// Based on uberscore's specHelpers
import * as _B from 'uberscore';
import * as _ from 'lodash';
const l = new _B.Logger('Log');

// @todo: extract expects & framework specifics
import { Expect, MatchError } from 'alsatian';
import { expect } from 'chai';

export interface IAwesomeMatchersConfig {
  matchAdaptor: IMatchAdaptor | null; // initially null, but must be configured
}

export const awesomeMatchersConfig: IAwesomeMatchersConfig = {
  matchAdaptor: null,
};

export interface IMatchResult {
  //@todo <T>
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
  rightValue?: any; //eg the value we expected @todo TReturn;

  actual?: any; // @todo: TActual
  expected?: any; // @todo: TExpected
}

export type IMatchAdaptor = (matchResult: IMatchResult) => void;

const cfg = awesomeMatchersConfig;

const checkAdaptor = () => { // @todo: use as guard
  if (!cfg.matchAdaptor) throw new Error('No `awesomeMatchersConfig.matchAdaptor` configured!');
};

/***
 Using _B.isXXX to construct some helpers
 */
/*
  Helper for _B.isEqual & _B.isLike that prints the path where discrepancy was found.
 */
const are = (name, shouldMatch = true) => {
  return (actual, expected) => {
    if (!cfg.matchAdaptor) throw new Error('No `awesomeMatchersConfig.matchAdaptor` configured!');
    
    const path = [];
    const isMatch = _B[name](actual, expected, {
      path,
      allProps: true,
      exclude: ['inspect'],
    });

    const mr = {
      isPassed: false,
      shouldMatch,
      isMatch,
      leftName: 'got',
      rightName: 'expected',
    };

    if (shouldMatch) {
      if (!isMatch) {
        cfg.matchAdaptor({
          ...mr,
          title: `Match Error: Wrong ${name} Difference`,
          explain:
            `It should | ACTUAL ${name} EXPECTED | but they are NOT. \n` +
            `At path: '${path.join('.')}'`,
          useValues: true,
          leftValue: _B.getp(actual, path),
          rightValue: _B.getp(expected, path),
          // actual,
          // expected,
        });
      }
    } else if (isMatch) {
      // they NOT shouldMatch (~ but they did!)
      cfg.matchAdaptor({
        ...mr,
        title: `Match Error: Wrong NOT ${name} similarity`,
        explain: `It should | NOT ACTUAL ${name} EXPECTED | but they are.`,
        useValues: true,
        leftValue: actual,
        rightValue: `a value that's NOT ${name}`,
      });
    }
  };
};

// const createEqualSet = asEqual => {
//   return (result, expected) => {
//     const isEq = _B.isEqualArraySet(result, expected);
//
//     if (asEqual) {
//       if (!isEq) {
//         l.warn(
//           '\\n _B.isEqualArraySet expected \`true\`',
//           '\\n result \\\\ expected \\n', _.difference(result, expected),
//           '\\n expected \\\\ result \\n', _.difference(expected, result)
//         );
//       }
//
//       // report
//       switch (cfg.testRuntime) {
//         case 'alsatian': {
//           Expect(isEq).toBe(true);
//           return
//         }
//         case 'chai': {
//           Expect(isEq).toBe(true);
//           return
//         }
//       }
//     }
//
//     if (isEq) {
//       l.warn('\n _B.isEqualArraySet expected `false`, got `true`');
//     }
//
//     Expect(isEq).toBe(false);
//   };
// };

// @todo: refactor all those
export const is = (actual, expected) => {
  if (!cfg.matchAdaptor) throw new Error('No `awesomeMatchersConfig.matchAdaptor` configured!');
  
  switch (cfg.matchAdaptor['testRuntime']) {
    case 'alsatian':
      Expect(actual).toBe(expected);
      break;

    case 'chai':
      expect(actual).to.be.equal(expected);
      break;
  }
};

export const isnt = (actual, expected) => {
  if (!cfg.matchAdaptor) throw new Error('No `awesomeMatchersConfig.matchAdaptor` configured!');
  
  switch (cfg.matchAdaptor['testRuntime']) {
    case 'alsatian':
      Expect(actual).not.toBe(expected);
      break;

    case 'chai':
      expect(actual).not.to.be.equal(expected);
      break;
  }
};
export const [toBe, notToBe] = [is, isnt];

export const ok = a => Expect(a).toBeTruthy();
export const notOk = a => Expect(a).not.toBeTruthy();
export const tru = a => Expect(a).toBe(true);
export const fals = a => Expect(a).toBe(false);

// export const equalSet = createEqualSet(true);
// export const notEqualSet = createEqualSet(false);

export const isEqual = are('isEqual');
export const isntEqual = are('isEqual', false);
export const isExact = are('isExact');
export const isntExact = are('isExact', false);
export const isIqual = are('isIqual');
export const isntIqual = are('isIqual', false);
export const isIxact = are('isIxact');
export const isntIxact = are('isIxact', false);
export const isLike = are('isLike');
export const isntLike = are('isLike', false);
export const iamLike = _.flip(isLike);
export const iamNotLike = _.flip(isntLike);

// exp
export const last = (items: any[], item) => {
  // if _.last(items) === item @todo: abstract it away to use createXXX
};
