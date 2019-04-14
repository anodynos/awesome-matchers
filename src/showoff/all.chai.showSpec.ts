import { expect } from 'chai';

import * as _ from 'lodash';
import * as _B from 'uberscore';
import { AwesomeMatchers, chaiAdaptor as matchAdaptor } from '..';
import {
  john,
  john2,
  johnLike,
  maria,
  theAnswerToLife,
} from '../fixtures/_fixtures';

const {
  is,
  isnt,
  ok,
  notOk,
  tru,
  fals,
  equalSet,
  notEqualSet,
  isEqual,
  isntEqual,
  isLike,
  isntLike,
} = new AwesomeMatchers({
  matchAdaptor,
});

describe('chai showSpec', () => {
  describe('ok', () => {
    describe('shouldPass', () => {
      it('chai.expect', () => {
        expect('some value').to.be.ok;
        expect(1).to.be.ok;
        expect({}).to.be.ok;
      });

      it('awesomeMatchers', () => {
        ok('some value');
        ok(1);
        ok({});
      });
    });

    describe('shouldFail', () => {
      it('chai.expect', () => {
        expect('').to.be.ok;
      });

      describe('awesomeMatchers', () => {
        it('empty string', () => ok(''));
        it('false', () => ok(false));
        it('zero', () => ok(0));
      });
    });
  });

  describe('notOk', () => {
    describe('shouldPass', () => {
      it('chai.expect', () => {
        expect('').not.to.be.ok;
        expect(0).not.to.be.ok;
      });

      describe('awesomeMatchers', () => {
        it('empty string', () => notOk(''));
        it('zero', () => notOk(0));
      });
    });

    describe('shouldFail', () => {
      it('chai.expect', () => {
        expect('some value').not.to.be.ok;
      });

      it('awesomeMatchers', () => {
        notOk('some value');
      });
    });
  });

  describe('fals', () => {
    describe('shouldPass', () => {
      it('chai.expect', () => {
        expect(false).to.be.false;
      });

      it('awesomeMatchers', () => {
        fals(false);
      });
    });

    describe('shouldFail', () => {
      it('chai.expect', () => {
        expect('not a false value').to.be.false;
      });

      it('awesomeMatchers', () => {
        fals('not a false value');
      });
    });
  });

  describe('tru', () => {
    describe('shouldPass', () => {
      it('chai.expect', () => {
        expect(true).to.be.true;
      });

      it('awesomeMatchers', () => {
        tru(true);
      });
    });

    describe('shouldFail', () => {
      it('chai.expect', () => {
        expect('not a true value').to.be.false;
      });

      it('awesomeMatchers', () => {
        fals('not a false value');
      });
    });
  });

  describe('is/isnt', () => {
    describe('shouldPass', () => {
      it('chai.expect', () => {
        expect(42).to.equal(theAnswerToLife);
        expect(84).not.to.equal(theAnswerToLife);
      });

      it('awesomeMatchers', () => {
        is(42, theAnswerToLife);
        isnt(84, theAnswerToLife);
      });
    });

    describe('is_shouldFail', () => {
      it('chai.expect', () => {
        expect(84).to.equal(theAnswerToLife);
      });

      it('awesomeMatchers', () => {
        is(84, theAnswerToLife);
      });
    });

    describe('isnt_shouldFail', () => {
      it('chai.expect', () => {
        expect(42).not.to.equal(theAnswerToLife);
      });

      it('awesomeMatchers', () => {
        isnt(42, theAnswerToLife);
      });
    });
  });

  describe('isEquals/isntEqual_', () => {
    describe('shouldPass', () => {
      it('chai.expect', () => {
        expect(john2).to.deep.equal(john);
        expect(maria).not.to.deep.equal(john);
      });

      it('awesomeMatchers', () => {
        isEqual(john2, john);
        isntEqual(maria, john);
      });
    });

    describe('isEqual_shouldFail', () => {
      it('chai.expect', () => {
        expect(maria).to.deep.equal(john);
      });

      it('awesomeMatchers', () => {
        isEqual(maria, john);
      });
    });

    describe('isntEqual_shouldFail', () => {
      it('chai.expect', () => {
        expect(john2).not.to.deep.equal(john);
      });

      it('awesomeMatchers', () => {
        isntEqual(john2, john);
      });
    });
  });

  describe('isLike/isntLike', () => {
    describe('shouldPass', () => {
      it('chai.expect', () => {
        expect(_B.isLike(johnLike, john)).to.be.true;
        expect(_B.isLike(maria, john)).to.be.false;
      });

      it('awesomeMatchers', () => {
        isLike(johnLike, john);
        isntLike(maria, john);
      });
    });

    // chai sucks in this https://stackoverflow.com/questions/29532981/match-partial-objects-in-chai-assertions
    describe('isLike_shouldFail', () => {
      it('chai.expect', () => {
        expect(_B.isLike(maria, john)).to.be.true;
      });

      it('awesomeMatchers', () => {
        isLike(maria, john);
      });
    });

    describe('isntLike_shouldFail', () => {
      it('chai.expect', () => {
        expect(_B.isLike(johnLike, john)).to.be.false;
      });

      it('awesomeMatchers', () => {
        isntLike(johnLike, john);
      });
    });
  });

  describe('equalSet', () => {
    describe('shouldPass', () => {
      it('byStrictEquality', () => {
        equalSet([1, 2, john, 3], [3, john, 2, 1]);
      });
      it('byDeepEquality', () => {
        equalSet(
          [{ a: 1 }, { b: 2 }, { c: 3 }, john],
          [{ c: 3 }, { b: 2 }, { a: 1 }, john2],
          _.isEqual,
        );
      });

      it('byLikeEquality', () => {
        equalSet(
          [{ a: 1 }, { b: 2 }, { c: 3 }, johnLike],
          [
            { c: 3, cc: 'ignored by like' },
            { b: 2 },
            { a: 1, aa: 'I dont matter!' },
            john,
          ],
          _B.isLike,
        );
      });
    });

    describe('shouldFail', () => {
      it('byStrictEquality', () => {
        equalSet([1, 2, 3, johnLike], [3, 2, 1, 4, john], _B.isLike);
      });
      it('byDeepEquality', () => {
        equalSet(
          [{ a: 1 }, { b: 2 }, { c: 3 }, john],
          [{ c: 3 }, { b: 2 }, { a: 1 }, maria],
          _.isEqual,
        );
      });

      it('byLikeEquality', () => {
        equalSet(
          [
            { a: 1, aa: 'I am different to normal "a" !' },
            { b: 2 },
            { c: 3 },
            johnLike,
          ],
          [{ c: 3 }, { b: 2 }, { a: 1 }, john],
          _B.isLike,
        );
      });
    });
  });
});
