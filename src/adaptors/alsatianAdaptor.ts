import { MatchError } from 'alsatian';
import { IMatchAdaptor, IMatchResult } from '../types';

export const alsatianAdaptor: IMatchAdaptor = (mr: IMatchResult) => {
  const descr = `${mr.title}   (alsatianAdaptor) \n ${mr.explain}`;

  if (mr.useValues) {
    throw new MatchError(descr, mr.rightValue, mr.leftValue);
  } else {
    throw new MatchError(descr);
  }
};

(alsatianAdaptor as any).adaptorName = 'alsatian';
