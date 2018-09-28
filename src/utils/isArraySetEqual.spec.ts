import * as _ from 'lodash';
import { Expect, Test, TestCase, TestFixture } from 'alsatian';
import isArraySetEqual from './isArraySetEqual';

const refComparator = (a, b) => a === b;

@TestFixture()
export class IsArraySetEqualSpec {
  @TestCase([1, 2, 3], [3, 2, 1], true)
  @TestCase([1, 2, 3, 4], [3, 2, 1], false)
  @TestCase([1, 2, 3], [4, 3, 2, 1], false)
  shouldCompareArraysByReferenceWithDefaultComparator(a, b, expected) {
    Expect(isArraySetEqual(a, b)).toEqual(expected);
  }

  @TestCase([1, 2, 3], [3, 2, 1], true)
  @TestCase([1, 2, 3, 4], [3, 2, 1], false)
  @TestCase([1, 2, 3], [4, 3, 2, 1], false)
  shouldCompareArraysByReferenceWithCustomComparator(a, b, expected) {
    Expect(isArraySetEqual(a, b, refComparator)).toEqual(expected);
  }

  @TestCase([{ a: 1 }, { b: 2 }, { c: 3 }], [{ c: 3 }, { b: 2 }, { a: 1 }], false)
  @TestCase(
    [{ a: 1 }, { b: 2 }, { c: 3 }],
    [{ d: 4 }, { c: 3 }, { b: 2 }, { a: 1 }],
    false,
    _.isEqual,
  )
  @TestCase(
    [{ a: 1 }, { b: 2 }, { c: 3 }],
    [{ c: 3 }, { b: 2 }, { a: 1 }],
    true,
    _.isEqual,
  )
  shouldCompareArraysByValueWithComparator(a, b, expected, comparator?) {
    Expect(isArraySetEqual(a, b, comparator)).toEqual(expected);
  }
}
