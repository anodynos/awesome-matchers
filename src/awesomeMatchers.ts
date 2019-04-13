// Based on uberscore's specHelpers
import * as _B from 'uberscore';
import * as _ from 'lodash';
const l = new _B.Logger('Log');

// @todo: extract expects & framework specifics

import isArraySetEqual from './utils/isArraySetEqual';
import { IAwesomeMatchersConfig, IMatchAdaptor } from './types';

const methods = ['is', 'isnt', 'ok', 'notOk', 'tru', 'fals', 'generic'];
const matchAdaptor: IMatchAdaptor = {} as any;
_.each(
  methods,
  method =>
    (matchAdaptor[method] = () => {
      throw new Error('No `awesomeMatchersConfig.matchAdaptor` configured!');
    }),
);
const cfg: IAwesomeMatchersConfig = { matchAdaptor };
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
        if (
          ['isEqual', 'isntEqual', 'isLike', 'isntLike'].includes(name) &&
          _.isFunction(cfg.matchAdaptor[name])
        ) {
          cfg.matchAdaptor[name](actual, expected);
        } else {
          cfg.matchAdaptor.generic({
            ...mr,
            op,
            name,
            title: `Match Error: Wrong '${name}' Difference (using ${op})`,
            explain:
              `It should | ACTUAL ${name} EXPECTED | but they are NOT. \n` +
              `At path: '${path.join('.')}'`,
            useValues: true,
            leftValue: flipped
              ? _B.getp(expected, path)
              : _B.getp(actual, path),
            rightValue: flipped
              ? _B.getp(actual, path)
              : _B.getp(expected, path),
            // actual,
            // expected,
          });
        }
      }
    } else if (isMatch) {
      // they NOT shouldMatch (~ but they did!)
      if (
        ['isEqual', 'isntEqual', 'isLike', 'isntLike'].includes(name) &&
        _.isFunction(cfg.matchAdaptor[name])
      ) {
        cfg.matchAdaptor[name](actual, expected);
      } else {
        cfg.matchAdaptor.generic({
          ...mr,
          op,
          name,
          title: `Match Error: Wrong NOT shouldMatch '${name}' similarity (using ${op})`,
          explain: `It should | ACTUAL ${name} EXPECTED | but they are.`,
          useValues: true,
          leftValue: flipped ? expected : actual,
          rightValue: `a value that's NOT ${op}`,
        });
      }
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
        cfg.matchAdaptor.generic({
          ...mr,
          op: 'is???',
          name: 'is???',
          title: `Match Error: Wrong isArraySetEqual equivalence`,
          explain: `It should | ACTUAL isArraySetEqual EXPECTED | but they are not.`,
          useValues: true,
          leftValue: _.differenceWith(actual, expected, comparator1),
          rightValue: _.differenceWith(expected, actual, comparator2),
        });
      }
    } else if (isMatch) {
      // they NOT shouldMatch (~ but they did!)
      cfg.matchAdaptor.generic({
        ...mr,
        op: 'isnt??',
        name: 'isnt??',
        title: `Match Error: Wrong NOT isArraySetEqual equivalence`,
        explain: `It should | NOT ACTUAL isArraySetEqual EXPECTED | but they are isArraySetEqual equivalent.`,
        useValues: false,
      });
    }
  };
};

// const flipWithProperNames = (f) => (expected, actual) =>

export const is = (actual, expected) => cfg.matchAdaptor.is(actual, expected);
export const isnt = (actual, expected) =>
  cfg.matchAdaptor.isnt(actual, expected);
export const [toBe, notBe] = [is, isnt]; // alias, used for coffeescript etc

export const ok = actual => cfg.matchAdaptor.ok(actual);
export const notOk = actual => cfg.matchAdaptor.notOk(actual);
export const tru = actual => cfg.matchAdaptor.tru(actual);
export const fals = actual => cfg.matchAdaptor.fals(actual);

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
