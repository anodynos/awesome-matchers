// Based on uberscore's specHelpers
import * as _B from 'uberscore';
import * as _ from 'lodash';
const l = new _B.Logger('Log');

// @todo: extract expects & framework specifics
import { Expect, MatchError } from 'alsatian';
import { expect } from 'chai';

// @todo: improve with passing ExpectationAdapter

export interface IAwesomeMatchersConfig {
  testRuntime: null | 'chai' | 'alsatian';
}

export const awesomeMatchersConfig: IAwesomeMatchersConfig = {
  testRuntime: null,
};

const cfg = awesomeMatchersConfig;

/***
 Using _B.isXXX to construct some helpers
 */
/*
  Helper for _B.isEqual & _B.isLike that prints the path where discrepancy was found.
 */
const are = (name, shouldMatch = true) => {
  return (actual, expected) => {
    const path = [];
    const isMatching = _B[name](actual, expected, {
      path,
      allProps: true,
      exclude: ['inspect'],
    });

    if (shouldMatch) {
      if (!isMatching) {
        const explain = [
          `Match Error: Wrong Difference:\n`,
          `It should ACTUAL ${name} EXPECTED but they are NOT.\n`,
          `At path: '${path.join('.')}'`,
          ' \n ### VALUES ### ',
          ' \n left value = ', // @todo: add \n if they not scalar
          _B.getp(actual, path),
          ' \n right value = ', // @todo: add \n if they not scalar`
          _B.getp(expected, path),
          ' \n \n ### OBJECTS ###', // @todo: only if they are objects
          // @todo: make it configurable
          ' \n left Object = \n',
          actual,
          ' \n right Object = \n',
          expected,
        ]; // @todo: seperate them and then compose 'em :-)

        // @todo: make configurable from with MatcherAdaptor
        switch (cfg.testRuntime) {
          case 'alsatian': {
            throw new MatchError(
              _.take(explain, 3).join(''),
              _B.getp(expected, path),
              _B.getp(actual, path),
            );
          }
          case 'chai': {
            // @todo: get rid of AssertionError: expected false to be true
            l.warn(...explain);
            expect(isMatching).to.be.true;
          }
        }
      }
    } else {
      // they !shouldMatch
      if (isMatching) {
        const explain = [
          `Match Error: Wrong similarity:\n` +
            `It should NOT ACTUAL ${name} EXPECTED but they are.`,
        ];

        switch (cfg.testRuntime) {
          case 'alsatian': {
            throw new MatchError(...explain);
          }
          case 'chai': {
            l.warn(...explain);
            expect(isMatching).to.be.false
          }
        }
      }
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

export const is = (actual, expected) => {
  switch (cfg.testRuntime) {
    case 'alsatian':
      Expect(actual).toBe(expected);
      break;

    case 'chai':
      expect(actual).to.be.equal(expected);
      break;
  }
};

export const isnt = (actual, expected) => {
  switch (cfg.testRuntime) {
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
export const equals = are('isEqual');
export const notEquals = are('isEqual', false);
export const exact = are('isExact');
export const notExact = are('isExact', false);
export const iqual = are('isIqual');
export const notIqual = are('isIqual', false);
export const ixact = are('isIxact');
export const notIxact = are('isIxact', false);
export const isLike = are('isLike');
export const isNotLike = are('isLike', false);
export const iamLike = _.flip(isLike);
export const iamNotLike = _.flip(isNotLike);

// exp
export const last = (items: any[], item) => {
  // if _.last(items) === item @todo: abstract it away to use createXXX
};
