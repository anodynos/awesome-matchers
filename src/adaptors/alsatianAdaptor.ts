import { IMatchAdaptor, IMatchResult } from '../awesomeMatchers';
import { MatchError } from 'alsatian';

export const alsatianAdaptor: IMatchAdaptor = (mr: IMatchResult) => {
  const descr = `${mr.title}   (alsatianAdaptor) \n ${mr.explain}`;

  if (mr.useValues) {
    throw new MatchError(descr, mr.rightValue, mr.leftValue);
  } else {
    throw new MatchError(descr);
  }
};

(alsatianAdaptor as any).adaptorName = 'alsatian';
