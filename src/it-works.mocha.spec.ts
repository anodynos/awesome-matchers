import { equalSet } from './specHelpers';
import { expect } from 'chai';

describe('Mocha test:', () => {
  describe("it should work with mocha", () => {
    it("should work with chai expect", () => {
      expect(42).to.be.equal(42)
    });
    it("should work with specHelpers", () => {
      equalSet([1,2,3], [3,2,1]);
    });
  });
});
