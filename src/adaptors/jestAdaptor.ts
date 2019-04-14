import * as _B from 'uberscore';
import { IMatchAdaptor, IMatchResult } from '../types';
const l = new _B.Logger('jestLog');
import * as _ from 'lodash';

// const opMap = {
//   is: 'toBe',
//   // isnt: 'not.toBe',
//   // isEqual: 'toEqual',
//   // isntEqual: 'not.toEqual'
// };

export const jestAdaptor: IMatchAdaptor = {
  adaptorName: 'jest',
  is: (actual, expected) => expect(actual).toBe(expected),
  isnt: (actual, expected) => expect(actual).not.toBe(expected),
  ok: actual => expect(actual).toBeTruthy(),
  notOk: actual => expect(actual).toBeFalsy(),
  tru: actual => expect(actual).toEqual(true),
  fals: actual => expect(actual).toEqual(false),
  isEqual: (actual, expected) => expect(actual).toEqual(expected),
  isntEqual: (actual, expected) => expect(actual).not.toEqual(expected),
  isLike: (expected, actual) =>
    expect(actual).toEqual(expect.objectContaining(expected)),
  isntLike: (expected, actual) =>
    expect(actual).not.toEqual(expect.objectContaining(expected)),
  // isntLike: (actual, expected) =>  expect(actual).not.toEqual(expect.objectContaining(expected)),

  generic: (mr: IMatchResult) => {
    const messages = [mr.title + '  (jestAdaptor.generic)  \n', mr.explain];

    if (mr.useValues) {
      messages.push(
        ...[
          ' \n ### VALUES ### ',
          ` \n ${mr.leftName} = `, // @todo: add \n if they not scalar
          mr.leftValue,
          ` \n ${mr.rightName} = `, // @todo: add \n if they not scalar`
          mr.rightValue,
        ],
      );
    }

    // @todo: configure those
    // ' \n actual = \n',
    // mr.actual,
    // ' \n expected = \n',
    // mr.expected

    l.warn(...messages);
    // console.log(expect(mr.isMatch), opMap[mr.op] || mr.op)
    // if (expect) _.get(expect(mr.isMatch), opMap[mr.op] || mr.op)(mr.shouldMatch);
    if (expect) expect(mr.isMatch).toBe(mr.shouldMatch);
    // @todo: fix to integrate with chai properly
    else throw new Error('`jest` is missing from your node_modules'); // make it a generic error in ALL 'methods' :-)
  },
};
