import Ember from 'ember';
import Node from '../models/node';
const { run } = Ember;

export default function() {
  switch (this.get('insertState.line')) {
    case 1:
      // node ← top
      this.set('insertState.node', this.get('root'));
      run.later(this, 'stepInsert', 2, this.get('beat'));
      break;
    case 2:
      // x ← new_node()
      this.set('insertState.x', new Node('(empty)'));
      run.later(this, 'stepInsert', 3, this.get('beat'));
      break;
    case 3:
      // item(x) ← name
      this.set('insertState.x.value', this.get('insertState.name'));
      run.later(this, 'stepInsert', 4, this.get('beat'));
      break;
    case 4:
      // repeat
      run.later(this, 'stepInsert', 5, this.get('beat'));
      break;
    case 5:
      // if item(node) = name
      if (this.get('insertState.node.value') === this.get('insertState.name')) {
        run.later(this, 'stepInsert', 6, this.get('beat'));
      } else {
        run.later(this, 'stepInsert', 7, this.get('beat'));
      }
      break;
    case 6:
      // then node ← nil;
      this.set('insertState.node', null);
      run.later(this, 'stepInsert', 17, this.get('beat'));
      break;
    case 7:
      // if item(node) > name
      if (this.get('insertState.node.value') > this.get('insertState.name')) {
        run.later(this, 'stepInsert', 8, this.get('beat'));
      } else {
        run.later(this, 'stepInsert', 12, this.get('beat'));
      }
      break;
    case 8:
      // then if left(node) = nil
      if (!this.get('insertState.node.left')) {
        run.later(this, 'stepInsert', 9, this.get('beat'));
      } else {
        run.later(this, 'stepInsert', 11, this.get('beat'));
      }
      break;
    case 9:
      // then left(node) ← x;
      this.set('insertState.node.left', this.get('insertState.x'));
      run.later(this, 'stepInsert', 10, this.get('beat'));
      break;
    case 10:
      // node ← nil;
      this.set('insertState.node', null);
      run.later(this, 'stepInsert', 17, this.get('beat'));
      break;
    case 11:
      // else node ← left(node);
      this.set('insertState.node', this.get('insertState.node.left'));
      run.later(this, 'stepInsert', 17, this.get('beat'));
      break;
    case 12:
      // if item(node) < name
      if (this.get('insertState.node.value') < this.get('insertState.name')) {
        run.later(this, 'stepInsert', 13, this.get('beat'));
      } else {
        run.later(this, 'stepInsert', 17, this.get('beat'));
      }
      break;
    case 13:
      // then if right(node) = nil
      if (!this.get('insertState.node.right')) {
        run.later(this, 'stepInsert', 14, this.get('beat'));
      } else {
        run.later(this, 'stepInsert', 16, this.get('beat'));
      }
      break;
    case 14:
      // then right(node) ← x;
      this.set('insertState.node.right', this.get('insertState.x'));
      run.later(this, 'stepInsert', 15, this.get('beat'));
      break;
    case 15:
      // node ← nil;
      this.set('insertState.node', null);
      run.later(this, 'stepInsert', 17, this.get('beat'));
      break;
    case 16:
      // else node ← right(node);
      this.set('insertState.node', this.get('insertState.node.right'));
      run.later(this, 'stepInsert', 17, this.get('beat'));
      break;
    case 17:
      // until node = nil
      if (!this.get('insertState.node')) {
        run.later(this, 'endInsert', this.get('beat'));
      } else {
        run.later(this, 'stepInsert', 4, this.get('beat'));
      }
      break;
  }
}
