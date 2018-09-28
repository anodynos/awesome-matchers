import { Expect, FocusTest, FocusTests, Test, TestFixture } from 'alsatian';
import { awesomeMatchersConfig, fals, notOk, ok, tru } from '../awesomeMatchers';
import { alsatianAdaptor } from '../adaptors';

awesomeMatchersConfig.matchAdaptor = alsatianAdaptor;

@TestFixture()
export class IsAlsatianShowSpec {

  @Test()
  expectOK() {
    Expect('some value').toBeTruthy();
  }

  @Test()
  itOK() {
    ok('some value')
  }
  
  @Test()
  expectNotOK() {
    Expect('').not.toBeTruthy();
  }

  @Test()
  itNotOK() {
    notOk('')
  }
  
  @Test()
  expectTru() {
    Expect(true).toBe(true);
  }

  @Test()
  itTru() {
    tru(true)
  }
  
  @Test()
  expectFals() {
    Expect(false).toBe(false);
  }

  @Test()
  itFals() {
    fals(false)
  }
}
