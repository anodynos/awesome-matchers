import * as _B from 'uberscore';
import { IMatchAdaptor, IMatchResult } from '../types';
import { expect } from 'chai';

const l = new _B.Logger('chaiLog');

export const chaiAdaptor: IMatchAdaptor = {
  adaptorName: 'chai',
  is: (actual, expected) => expect(actual).to.be.equal(expected),
  isnt: (actual, expected) => expect(actual).not.to.be.equal(expected),
  ok: actual => expect(actual).to.be.ok,
  notOk: actual => expect(actual).not.be.ok,
  tru: actual => expect(actual).to.be.true,
  fals: actual => expect(actual).to.be.false,
  generic: (mr: IMatchResult) => {
    const messages = [mr.title + '  (chaiAdaptor.generic)  \n', mr.explain];

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
    if (expect) expect(mr.isMatch).to.be[mr.shouldMatch + ''];
    // @todo: fix to integrate with chai properly
    else throw new Error('`chai` is missing from your node_modules'); // make it a generic error in ALL 'methods' :-)
  },
};
