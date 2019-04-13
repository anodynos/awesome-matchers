import { Expect, MatchError } from 'alsatian';
import { IMatchAdaptor, IMatchResult } from '../types';

export const alsatianAdaptor: IMatchAdaptor = {
  adaptorName: 'alsatian',
  is: (actual, expected) => Expect(actual).toBe(expected),
  isnt: (actual, expected) => Expect(actual).not.toBe(expected),

  ok: actual => Expect(actual).toBeTruthy(),
  notOk: actual => Expect(actual).not.toBeTruthy(),
  tru: actual => Expect(actual).toBe(true),
  fals: actual => Expect(actual).toBe(false),

  generic: (mr: IMatchResult) => {
    const descr = `${mr.title}   (alsatianAdaptor.generic) \n ${mr.explain}`;

    if (mr.useValues) {
      throw new MatchError(descr, mr.rightValue, mr.leftValue);
    } else {
      throw new MatchError(descr);
    }
  },
};
