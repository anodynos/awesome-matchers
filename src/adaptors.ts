import * as _B from 'uberscore';
import * as _ from 'lodash';
import { IMatchAdaptor, IMatchResult } from './awesomeMatchers';
import { MatchError } from 'alsatian';
import { expect } from 'chai';

const chaiLog = new _B.Logger('Log');

export const chaiAdaptor: IMatchAdaptor = (mr: IMatchResult) => {
  chaiLog.warn(
    mr.title + '  (chaiAdaptor) \n',
    mr.explain,
    ' \n ### VALUES ### ',
    ` \n ${mr.leftName} = `, // @todo: add \n if they not scalar
    mr.leftValue,
    ` \n ${mr.rightName} = `, // @todo: add \n if they not scalar`
    mr.rightValue,
    
    // @todo: configure those
    // ' \n actual = \n',
    // mr.actual,
    // ' \n expected = \n',
    // mr.expected
  );
  
  expect(mr.isMatch).to.be[mr.shouldMatch + '']; // @todo: fix to integrate with chai properly
};

chaiAdaptor['testRuntime'] = 'chai';

export const alsatianAdaptor: IMatchAdaptor = (mr: IMatchResult) => {
  const descr = `${mr.title}   (alsatianAdaptor) \n ${mr.explain}`;

  if (mr.useValues) {
    throw new MatchError(descr, mr.rightValue, mr.leftValue);
  } else {
    throw new MatchError(descr);
  }
};

alsatianAdaptor['testRuntime'] = 'alsatian';
