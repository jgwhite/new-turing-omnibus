import Ember from 'ember';
import Node from '../models/node';
const { run } = Ember;

export default function() {
  switch (this.get('removeState.line')) {
    case 1:
      // node ← top
      this.set('removeState.node', this.get('root'));
      run.later(this, 'stepRemove', 2, this.get('beat'));
      break;
    case 2:
      // repeat
      run.later(this, 'stepRemove', 3, this.get('beat'));
      break;
    case 3:
      // if item(left(node)) = name
      if (this.get('removeState.node.left.value') === this.get('removeState.name')) {
        run.later(this, 'stepRemove', 4, this.get('beat'));
      } else {
        run.later(this, 'stepRemove', 11, this.get('beat'));
      }
      break;
    case 4:
      // then X ← left(node);
      this.set('removeState.x', this.get('removeState.node.left'));
      run.later(this, 'stepRemove', 5, this.get('beat'));
      break;
    case 5:
      // left(node) ← left(X);
      this.set('removeState.node.left', this.get('removeState.x.left'));
      run.later(this, 'stepRemove', 6, this.get('beat'));
      break;
    case 6:
      // node ← left(X);
      this.set('removeState.node', this.get('removeState.x.left'));
      run.later(this, 'stepRemove', 7, this.get('beat'));
      break;
    case 7:
      // repeat
      if (!this.get('removeState.node.right')) {
        run.later(this, 'stepRemove', 10, this.get('beat'));
      } else {
        run.later(this, 'stepRemove', 8, this.get('beat'));
      }
      break;
    case 8:
      // node ← right(node);
      this.set('removeState.node', this.get('removeState.node.right'));
      run.later(this, 'stepRemove', 9, this.get('beat'));
      break;
    case 9:
      // until right(node) = nil
      if (!this.get('removeState.node.right')) {
        run.later(this, 'stepRemove', 10, this.get('beat'));
      } else {
        run.later(this, 'stepRemove', 7, this.get('beat'));
      }
      break;
    case 10:
      // right(node) ← right(X); node ← nil;
      this.set('removeState.node.right', this.get('removeState.x.right'));
      this.set('removeState.node', null);
      run.later(this, 'stepRemove', 23, this.get('beat'));
      break;
    case 11:
      // if item(right(node)) = name
      if (this.get('removeState.node.right.value') === this.get('removeState.name')) {
        run.later(this, 'stepRemove', 12, this.get('beat'));
      } else {
        run.later(this, 'stepRemove', 19, this.get('beat'));
      }
      break;
    case 12:
      // then X ← right(node);
      this.set('removeState.x', this.get('removeState.node.right'));
      run.later(this, 'stepRemove', 13, this.get('beat'));
      break;
    case 13:
      // right(node) ← left(X);
      this.set('removeState.node.right', this.get('removeState.x.left'));
      run.later(this, 'stepRemove', 14, this.get('beat'));
      break;
    case 14:
      // node ← left(X);
      this.set('removeState.node', this.get('removeState.x.left'));
      run.later(this, 'stepRemove', 15, this.get('beat'));
      break;
    case 15:
      // repeat
      if (!this.get('removeState.node.right')) {
        run.later(this, 'stepRemove', 18, this.get('beat'));
      } else {
        run.later(this, 'stepRemove', 16, this.get('beat'));
      }
      break;
    case 16:
      // node ← right(node);
      this.set('removeState.node', this.get('removeState.node.right'));
      run.later(this, 'stepRemove', 17, this.get('beat'));
      break;
    case 17:
      // until right(node) = nil
      if (!this.get('removeState.node.right')) {
        run.later(this, 'stepRemove', 18, this.get('beat'));
      } else {
        run.later(this, 'stepRemove', 15, this.get('beat'));
      }
      break;
    case 18:
      // right(node) ← right(X); node ← nil;
      this.set('removeState.node.right', this.get('removeState.x.right'));
      this.set('removeState.node', null);
      run.later(this, 'stepRemove', 23, this.get('beat'));
      break;
    case 19:
      // if item(node) &gt; name
      if (this.get('removeState.node.value') > this.get('removeState.name')) {
        run.later(this, 'stepRemove', 20, this.get('beat'));
      } else {
        run.later(this, 'stepRemove', 21, this.get('beat'));
      }
      break;
    case 20:
      // then node ← left(node);
      this.set('removeState.node', this.get('removeState.node.left'));
      run.later(this, 'stepRemove', 23, this.get('beat'));
      break;
    case 21:
      // if item(node) &lt; name
      if (this.get('removeState.node.value') < this.get('removeState.name')) {
        run.later(this, 'stepRemove', 22, this.get('beat'));
      } else {
        run.later(this, 'stepRemove', 23, this.get('beat'));
      }
      break;
    case 22:
      // then node ← right(node);
      this.set('removeState.node', this.get('removeState.node.right'));
      run.later(this, 'stepRemove', 23, this.get('beat'));
      break;
    case 23:
      // until node = nil
      if (!this.get('removeState.node')) {
        run.later(this, 'endRemove', this.get('beat'));
      } else {
        run.later(this, 'stepRemove', 2, this.get('beat'));
      }
      break;
  }
}
