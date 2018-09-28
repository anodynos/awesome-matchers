import { Expect, Test, TestFixture } from 'alsatian';

@TestFixture()
export class ItWorksSpec {
  @Test('itWorks')
  itWorks() {
    Expect(42).toBe(42);
  }
}
