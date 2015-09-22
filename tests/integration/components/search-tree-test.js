import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('search-tree', 'Integration | Component | search tree', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{search-tree}}`);

  assert.ok(this.$('svg').length, 'expected to render and svg');
});
