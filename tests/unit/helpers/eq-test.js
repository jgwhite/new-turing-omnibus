import { eq } from '../../../helpers/eq';
import { module, test } from 'qunit';

module('Unit | Helper | eq');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.equal(eq([42, 42]), true);
  assert.equal(eq([42, 40]), false);
});
