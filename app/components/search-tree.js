import Ember from 'ember';
import Node from '../models/node';
const { computed, run } = Ember;
const BEAT = 1000;

export default Ember.Component.extend({
  tagName: 'search-tree',
  searchState: null,
  insertState: null,

  src: computed('root', 'searchState.line', 'insertState.line', function() {
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
    let svg = Viz(src);

    return svg;
  }),

  search(name) {
    this.set('searchState', {
      name,
      found: null,
      node: null,
      line: 0,
      ops: 0
    });

    run.later(this, 'stepSearch', 1, BEAT);

    return false;
  },

  stepSearch(line) {
    this.set('searchState.line', line);
    this.incrementProperty('searchState.ops');

    switch (line) {
      case 1:
        // found <- false
        this.set('searchState.found', false);
        run.later(this, 'stepSearch', 2, BEAT);
        break;
      case 2:
        // node <- top
        this.set('searchState.node', this.get('root'));
        run.later(this, 'stepSearch', 3, BEAT);
        break;
      case 3:
        // repeat
        run.later(this, 'stepSearch', 4, BEAT);
        break;
      case 4:
        // if item(node) = name
        if (this.get('searchState.node.value') === this.get('searchState.name')) {
          run.later(this, 'stepSearch', 5, BEAT);
        } else {
          run.later(this, 'stepSearch', 8, BEAT);
        }
        break;
      case 5:
        // then print “Yes”;
        run.next(() => alert('Yes'));
        run.later(this, 'stepSearch', 6, BEAT);
        break;
      case 6:
        // node <- nil;
        this.set('searchState.node', null);
        run.later(this, 'stepSearch', 7, BEAT);
        break;
      case 7:
        // found <- true;
        this.set('searchState.found', true);
        run.later(this, 'stepSearch', 12, BEAT);
        break;
      case 8:
        // if item(node) > name
        if (this.get('searchState.node.value') > this.get('searchState.name')) {
          run.later(this, 'stepSearch', 9, BEAT);
        } else {
          run.later(this, 'stepSearch', 10, BEAT);
        }
        break;
      case 9:
        // then node <- left(node)
        this.set('searchState.node', this.get('searchState.node.left'));
        run.later(this, 'stepSearch', 12, BEAT);
        break;
      case 10:
        // if item(node) < name
        if (this.get('searchState.node.value') < this.get('searchState.name')) {
          run.later(this, 'stepSearch', 11, BEAT);
        } else {
          run.later(this, 'stepSearch', 12, BEAT);
        }
        break;
      case 11:
        // then node <- right(node);
        this.set('searchState.node', this.get('searchState.node.right'));
        run.later(this, 'stepSearch', 12, BEAT);
        break;
      case 12:
        // until node = nil
        if (this.get('searchState.node') === null) {
          run.later(this, 'stepSearch', 13, BEAT);
        } else {
          run.later(this, 'stepSearch', 3, BEAT);
        }
        break;
      case 13:
        // if not found
        if (this.get('searchState.found') === false) {
          run.later(this, 'stepSearch', 14, BEAT);
        } else {
          run.later(this, 'endSearch', BEAT);
        }
        break;
      case 14:
        // then print “No”;
        run.next(() => alert('No'));
        run.later(this, 'endSearch', BEAT);
        break;
    }
  },

  endSearch() {
    this.set('searchState', null);
  },

  insert(name) {
    this.set('insertState', {
      name,
      x: null,
      node: null,
      line: 0,
      ops: 0
    });

    run.later(this, 'stepInsert', 1, BEAT);

    return false;
  },

  stepInsert(line) {
    this.set('insertState.line', line);
    this.incrementProperty('insertState.ops');

    switch (line) {
      case 1:
        // node ← top
        this.set('insertState.node', this.get('root'));
        run.later(this, 'stepInsert', 2, BEAT);
        break;
      case 2:
        // x ← new_node()
        this.set('insertState.x', new Node('(empty)'));
        run.later(this, 'stepInsert', 3, BEAT);
        break;
      case 3:
        // item(x) ← name
        this.set('insertState.x.value', this.get('insertState.name'));
        run.later(this, 'stepInsert', 4, BEAT);
        break;
      case 4:
        // repeat
        run.later(this, 'stepInsert', 5, BEAT);
        break;
      case 5:
        // if item(node) = name
        if (this.get('insertState.node.value') === this.get('insertState.name')) {
          run.later(this, 'stepInsert', 6, BEAT);
        } else {
          run.later(this, 'stepInsert', 7, BEAT);
        }
        break;
      case 6:
        // then node ← nil;
        this.set('insertState.node', null);
        run.later(this, 'stepInsert', 17, BEAT);
        break;
      case 7:
        // if item(node) > name
        if (this.get('insertState.node.value') > this.get('insertState.name')) {
          run.later(this, 'stepInsert', 8, BEAT);
        } else {
          run.later(this, 'stepInsert', 12, BEAT);
        }
        break;
      case 8:
        // then if left(node) = nil
        if (!this.get('insertState.node.left')) {
          run.later(this, 'stepInsert', 9, BEAT);
        } else {
          run.later(this, 'stepInsert', 11, BEAT);
        }
        break;
      case 9:
        // then left(node) ← x;
        this.set('insertState.node.left', this.get('insertState.x'));
        run.later(this, 'stepInsert', 10, BEAT);
        break;
      case 10:
        // node ← nil;
        this.set('insertState.node', null);
        run.later(this, 'stepInsert', 17, BEAT);
        break;
      case 11:
        // else node ← left(node);
        this.set('insertState.node', this.get('insertState.node.left'));
        run.later(this, 'stepInsert', 17, BEAT);
        break;
      case 12:
        // if item(node) < name
        if (this.get('insertState.node.value') < this.get('insertState.name')) {
          run.later(this, 'stepInsert', 13, BEAT);
        } else {
          run.later(this, 'stepInsert', 17, BEAT);
        }
        break;
      case 13:
        // then if right(node) = nil
        if (!this.get('insertState.node.right')) {
          run.later(this, 'stepInsert', 14, BEAT);
        } else {
          run.later(this, 'stepInsert', 16, BEAT);
        }
        break;
      case 14:
        // then right(node) ← x;
        this.set('insertState.node.right', this.get('insertState.x'));
        run.later(this, 'stepInsert', 15, BEAT);
        break;
      case 15:
        // node ← nil;
        this.set('insertState.node', null);
        run.later(this, 'stepInsert', 17, BEAT);
        break;
      case 16:
        // else node ← right(node);
        this.set('insertState.node', this.get('insertState.node.right'));
        run.later(this, 'stepInsert', 17, BEAT);
        break;
      case 17:
        // until node = nil
        if (!this.get('insertState.node')) {
          run.later(this, 'endInsert', BEAT);
        } else {
          run.later(this, 'stepInsert', 4, BEAT);
        }
        break;
    }
  },

  endInsert() {
    this.set('insertState', null);
  },

  drawNode(node, result) {
    let color = 'black';

    if (this.get('searchState.node') === node || this.get('insertState.node') === node) {
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
