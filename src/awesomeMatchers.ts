// Based on uberscore's specHelpers
import * as _B from 'uberscore';
import * as _ from 'lodash';
const l = new _B.Logger('Log');

import isArraySetEqual from './utils/isArraySetEqual';
import { IAwesomeMatchersConfig, IMatchAdaptor } from './types';

const methods = ['is', 'isnt', 'ok', 'notOk', 'tru', 'fals', 'generic'];
const matchAdaptor: IMatchAdaptor = {} as any;
_.each(
  methods,
  method =>
    (matchAdaptor[method] = () => {
      throw new Error('No `cfg.matchAdaptor` configured!');
    }),
);

export class AwesomeMatchers {
  constructor(private cfg: IAwesomeMatchersConfig) {}
  /***
   Using _B.isXXX to construct some helpers
   */
  /*
    Helper for _B.isEqual & _B.isLike that prints the path where discrepancy was found.
   */
  private are = (op, name = op, shouldMatch = true, flipped = false) => {
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
            _.isFunction(this.cfg.matchAdaptor[name])
          ) {
            this.cfg.matchAdaptor[name](actual, expected);
          } else {
            this.cfg.matchAdaptor.generic({
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
          _.isFunction(this.cfg.matchAdaptor[name])
        ) {
          this.cfg.matchAdaptor[name](actual, expected);
        } else {
          this.cfg.matchAdaptor.generic({
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

  private createEqualSet = (shouldMatch = true) => {
    return (actual, expected, comparator1?, comparator2?) => {
      if (!this.cfg.matchAdaptor) {
        throw new Error('No `awesomeMatchersConfig.matchAdaptor` configured!');
      }

      if (!comparator1) comparator1 = (a, b) => a === b;
      if (!comparator2) comparator2 = _.flip(comparator1);

      const isMatch = isArraySetEqual(
        actual,
        expected,
        comparator1,
        comparator2,
      );
      const mr = {
        isPassed: false,
        shouldMatch,
        isMatch,
        leftName: '\n actual \\ expected ',
        rightName: '\n expected \\ actual ',
      };

      if (shouldMatch) {
        if (!isMatch) {
          this.cfg.matchAdaptor.generic({
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
        this.cfg.matchAdaptor.generic({
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

  public is = (actual, expected) => this.cfg.matchAdaptor.is(actual, expected);
  public isnt = (actual, expected) =>
    this.cfg.matchAdaptor.isnt(actual, expected);
  public toBe = this.is; // alias, used for coffeescript etc
  public notBe = this.isnt; // alias, used for coffeescript etc

  public ok = actual => this.cfg.matchAdaptor.ok(actual);
  public notOk = actual => this.cfg.matchAdaptor.notOk(actual);
  public tru = actual => this.cfg.matchAdaptor.tru(actual);
  public fals = actual => this.cfg.matchAdaptor.fals(actual);

  public equalSet = this.createEqualSet();
  public notEqualSet = this.createEqualSet(false);

  public isEqual = this.are('isEqual');
  public isntEqual = this.are('isEqual', 'isntEqual', false);
  public isExact = this.are('isExact');
  public isntExact = this.are('isExact', 'isntExact', false);
  public isIqual = this.are('isIqual');
  public isntIqual = this.are('isIqual', 'isntIqual', false);
  public isIxact = this.are('isIxact');
  public isntIxact = this.are('isIxact', 'isntIxact', false);
  public isLike = this.are('isLike');
  public isntLike = this.are('isLike', 'isntLike', false);

  public iamLike = _.flip(this.are('isLike', 'iamLike', true, true));
  public iamNotLike = _.flip(this.are('isLike', 'iamNotLike', false, true));
}

// const flipWithProperNames = (f) => (expected, actual) =>

// public last = (items: any[], item) => {
//   // if _.last(items) === item @todo: abstract it away to use createXXX
// };
