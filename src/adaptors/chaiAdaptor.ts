import * as _B from 'uberscore';
import { IMatchAdaptor, IMatchResult } from '../types';

let expect;

try {
  expect = require('chai').expect;
} catch (ignore) {}

const chaiLog = new _B.Logger('chaiLog');

export const chaiAdaptor: IMatchAdaptor = (mr: IMatchResult) => {
  const messages = [mr.title + '  (chaiAdaptor) \n', mr.explain];

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

  chaiLog.warn(...messages);
  if (expect) expect(mr.isMatch).to.be[mr.shouldMatch + ''];
  // @todo: fix to integrate with chai properly
  else throw new Error('`chai` is missing from your node_modules');
};

(chaiAdaptor as any).adaptorName = 'chai';
