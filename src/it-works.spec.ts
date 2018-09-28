import { Expect, Test, TestFixture } from 'alsatian';
import { equalSet } from './specHelpers';

@TestFixture()
export class ItWorksSpec {
  @Test('itWorks')
  itWorks() {
    Expect(42).toBe(42);
  }
  
  @Test('itUsesSpecHelpers')
  itUsesSpecHelpers() {
    equalSet([1,2,3], [3,2,1,4])
  }
}
