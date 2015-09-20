import Ember from 'ember';
const { computed, run } = Ember;
const BEAT = 1000;

export default Ember.Component.extend({
  tagName: 'search-tree',
  searchState: null,

  src: computed('root', 'searchState.line', function() {
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

  drawNode(node, result) {
    let color = 'black';

    if (this.get('searchState.node') === node) {
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
