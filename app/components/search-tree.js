import Ember from 'ember';
import search from '../programs/search';
import insert from '../programs/insert';
import remove from '../programs/remove';
const { Component, computed, run } = Ember;
const SPEEDS = {
  fast: 100,
  medium: 500,
  slow: 1000
};

export default Component.extend({
  tagName: 'search-tree',
  searchState: null,
  insertState: null,
  removeState: null,
  program: 'SEARCH',
  speed: 'fast',
  beat: computed('speed', function() {
    return SPEEDS[this.get('speed')];
  }),

  src: computed('root', 'searchState.line', 'insertState.line', 'removeState.line', function() {
    let node = this.get('root');
    let result = '';

    result += 'digraph g {\n';
    result += '  node [shape=record fontsize=10];\n';
    result += '  splines = line;\n';
    result = this.drawNode(node, result);
    result += '}';

    console.log(result);

    return result;
  }),

  svg: computed('src', function() {
    let src = this.get('src');
    let svg = Viz(src); // jshint ignore:line

    return svg;
  }),

  search(name) {
    this.set('searchState', {
      name,
      found: null,
      node: null,
      line: 0
    });

    run.later(this, 'stepSearch', 1, this.get('beat'));

    return false;
  },

  stepSearch(line) {
    this.set('searchState.line', line);
    search.call(this);
  },

  endSearch() {
    this.set('searchState', null);
  },

  insert(name) {
    this.set('insertState', {
      name,
      x: null,
      node: null,
      line: 0
    });

    run.later(this, 'stepInsert', 1, this.get('beat'));

    return false;
  },

  stepInsert(line) {
    this.set('insertState.line', line);
    insert.call(this);
  },

  endInsert() {
    this.set('insertState', null);
  },

  remove(name) {
    this.set('removeState', {
      name,
      x: null,
      node: null,
      line: 0
    });

    run.later(this, 'stepRemove', 1, this.get('beat'));

    return false;
  },

  stepRemove(line) {
    this.set('removeState.line', line);
    remove.call(this);
  },

  endRemove() {
    this.set('removeState', null);
  },

  drawNode(node, result) {
    if (!node) { return result; }

    let color = 'black';

    if (this.get('searchState.node') === node || this.get('insertState.node') === node || this.get('removeState.node') === node) {
      color = 'red';
    }

    result += `  ${node.id} [label="<v>${node.value}|<l>&middot;|<r>&middot;" color="${color}" fontcolor="${color}"];\n`;

    if (node.left) {
      result += `  ${node.id}:l -> ${node.left.id};\n`;
      result = this.drawNode(node.left, result);
    }

    if (node.right) {
      result += `  ${node.id}:r -> ${node.right.id};\n`;
      result = this.drawNode(node.right, result);
    }

    return result;
  }
});
