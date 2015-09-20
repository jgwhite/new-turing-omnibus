import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  src: computed('root', function() {
    let node = this.get('root');
    let result = '';

    result += 'digraph g {\n';
    result += '  node [shape=record];\n';
    result += '  splines = line;\n';
    result = drawNode(node, result);
    result += '}';

    console.log(result);

    return result;
  }),

  svg: computed('root', function() {
    let src = this.get('src');
    let svg = Viz(src);

    return svg;
  })
});

function drawNode(node, result) {
  result += `  ${node.id} [label="<v>${node.value}|<l>&middot;|<r>&middot;"];\n`;

  if (node.left) {
    result += `  ${node.id}:l -> ${node.left.id};\n`;
    result = drawNode(node.left, result);
  }

  if (node.right) {
    result += `  ${node.id}:r -> ${node.right.id};\n`;
    result = drawNode(node.right, result);
  }

  return result;
}
