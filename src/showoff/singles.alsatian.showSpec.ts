import { Expect, FocusTest, FocusTests, Test, TestFixture } from 'alsatian';
import { AwesomeMatchers } from '../awesomeMatchers';
import { alsatianAdaptor as matchAdaptor } from '../adaptors/alsatianAdaptor';

const { fals, notOk, ok, tru } = new AwesomeMatchers({ matchAdaptor });

@TestFixture()
export class SinglesAlsatianShowSpec {
  @Test()
  expectOK() {
    Expect('some value').toBeTruthy();
  }

  @Test()
  itOK() {
    ok('some value');
  }

  @Test()
  expectNotOK() {
    Expect('').not.toBeTruthy();
  }

  @Test()
  itNotOK() {
    notOk('');
  }

  @Test()
  expectTru() {
    Expect(true).toBe(true);
  }

  @Test()
  itTru() {
    tru(true);
  }

  @Test()
  expectFals() {
    Expect(false).toBe(false);
  }

  @Test()
  itFals() {
    fals(false);
  }
}
