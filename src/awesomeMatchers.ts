// Based on uberscore's specHelpers
import * as _B from 'uberscore';
import * as _ from 'lodash';
const l = new _B.Logger('Log');

// @todo: extract expects & framework specifics
import { Expect } from 'alsatian';
import { expect } from 'chai';
import isArraySetEqual from './utils/isArraySetEqual';
import { IAwesomeMatchersConfig } from './types';

const cfg: IAwesomeMatchersConfig = {
  matchAdaptor: () => {
    throw new Error('No `awesomeMatchersConfig.matchAdaptor` configured!');
  },
};

export const awesomeMatchersConfig = cfg;

/***
 Using _B.isXXX to construct some helpers
 */
/*
  Helper for _B.isEqual & _B.isLike that prints the path where discrepancy was found.
 */
const are = (op, name = op, shouldMatch = true, flipped = false) => {
  return (actual, expected) => {
    // try {
    const path = [];
    const isMatch = _B[op](actual, expected, {
      path,
      allProps: true,
      exclude: ['inspect'],
    });

    const mr = {
      // @todo: Partial<IMatchResult> = {
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
          title: `Match Error: Wrong '${name}' Difference (using ${op})`,
          explain:
            `It should | ACTUAL ${name} EXPECTED | but they are NOT. \n` +
            `At path: '${path.join('.')}'`,
          useValues: true,
          leftValue: flipped ? _B.getp(expected, path) : _B.getp(actual, path),
          rightValue: flipped ? _B.getp(actual, path) : _B.getp(expected, path),
          // actual,
          // expected,
        });
      }
    } else if (isMatch) {
      // they NOT shouldMatch (~ but they did!)
      cfg.matchAdaptor({
        ...mr,
        title: `Match Error: Wrong NOT shouldMatch '${name}' similarity (using ${op})`,
        explain: `It should | ACTUAL ${name} EXPECTED | but they are.`,
        useValues: true,
        leftValue: flipped ? expected : actual,
        rightValue: `a value that's NOT ${op}`,
      });
    }
    // } catch (err) {
    //   console.log('ERRRRRRRRROR', err)
    // }
  };
};

const createEqualSet = (shouldMatch = true) => {
  return (actual, expected, comparator1?, comparator2?) => {
    if (!cfg.matchAdaptor) {
      throw new Error('No `awesomeMatchersConfig.matchAdaptor` configured!');
    }

    if (!comparator1) comparator1 = (a, b) => a === b;
    if (!comparator2) comparator2 = _.flip(comparator1);

    const isMatch = isArraySetEqual(actual, expected, comparator1, comparator2);
    const mr = {
      isPassed: false,
      shouldMatch,
      isMatch,
      leftName: '\n actual \\ expected ',
      rightName: '\n expected \\ actual ',
    };

    if (shouldMatch) {
      if (!isMatch) {
        cfg.matchAdaptor({
          ...mr,
          title: `Match Error: Wrong isArraySetEqual equivalence`,
          explain: `It should | ACTUAL isArraySetEqual EXPECTED | but they are not.`,
          useValues: true,
          leftValue: _.differenceWith(actual, expected, comparator1),
          rightValue: _.differenceWith(expected, actual, comparator2),
        });
      }
    } else if (isMatch) {
      // they NOT shouldMatch (~ but they did!)
      cfg.matchAdaptor({
        ...mr,
        title: `Match Error: Wrong NOT isArraySetEqual equivalence`,
        explain: `It should | NOT ACTUAL isArraySetEqual EXPECTED | but they are isArraySetEqual equivalent.`,
        useValues: false,
      });
    }
  };
};

// @todo: refactor all those
export const is = (actual, expected) => {
  if (!cfg.matchAdaptor) {
    throw new Error('No `awesomeMatchersConfig.matchAdaptor` configured!');
  }

  switch (cfg.matchAdaptor['adaptorName']) {
    case 'alsatian':
      Expect(actual).toBe(expected);
      break;

    case 'chai':
      expect(actual).to.be.equal(expected);
      break;

    default:
      throw new Error(
        `awesomeMatchersConfig.matchAdaptor has unknown adaptorName: ${
          cfg.matchAdaptor['adaptorName']
        }`!,
      );
  }
};

export const isnt = (actual, expected) => {
  if (!cfg.matchAdaptor) {
    throw new Error('No `awesomeMatchersConfig.matchAdaptor` configured!');
  }

  switch (cfg.matchAdaptor['adaptorName']) {
    case 'alsatian':
      Expect(actual).not.toBe(expected);
      break;

    case 'chai':
      expect(actual).not.to.be.equal(expected);
      break;

    default:
      throw new Error(
        `awesomeMatchersConfig.matchAdaptor has unknown adaptorName: ${
          cfg.matchAdaptor['adaptorName']
        }`!,
      );
  }
};

// const flipWithProperNames = (f) => (expected, actual) =>

export const [toBe, notToBe] = [is, isnt];

export const ok = a => Expect(a).toBeTruthy();
export const notOk = a => Expect(a).not.toBeTruthy();
export const tru = a => Expect(a).toBe(true);
export const fals = a => Expect(a).toBe(false);

export const equalSet = createEqualSet();
export const notEqualSet = createEqualSet(false);

export const isEqual = are('isEqual');
export const isntEqual = are('isEqual', 'isntEqual', false);
export const isExact = are('isExact');
export const isntExact = are('isExact', 'isntExact', false);
export const isIqual = are('isIqual');
export const isntIqual = are('isIqual', 'isntIqual', false);
export const isIxact = are('isIxact');
export const isntIxact = are('isIxact', 'isntIxact', false);
export const isLike = are('isLike');
export const isntLike = are('isLike', 'isntLike', false);

export const iamLike = _.flip(are('isLike', 'iamLike', true, true));
export const iamNotLike = _.flip(are('isLike', 'iamNotLike', false, true));

// exp
export const last = (items: any[], item) => {
  // if _.last(items) === item @todo: abstract it away to use createXXX
};
