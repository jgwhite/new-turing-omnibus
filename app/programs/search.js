import Ember from 'ember';
const { run } = Ember;

export default function() {
  switch (this.get('searchState.line')) {
    case 1:
      // found <- false
      this.set('searchState.found', false);
      run.later(this, 'stepSearch', 2, this.get('beat'));
      break;
    case 2:
      // node <- top
      this.set('searchState.node', this.get('root'));
      run.later(this, 'stepSearch', 3, this.get('beat'));
      break;
    case 3:
      // repeat
      run.later(this, 'stepSearch', 4, this.get('beat'));
      break;
    case 4:
      // if item(node) = name
      if (this.get('searchState.node.value') === this.get('searchState.name')) {
        run.later(this, 'stepSearch', 5, this.get('beat'));
      } else {
        run.later(this, 'stepSearch', 8, this.get('beat'));
      }
      break;
    case 5:
      // then print “Yes”;
      run.next(() => alert('Yes'));
      run.later(this, 'stepSearch', 6, this.get('beat'));
      break;
    case 6:
      // node <- nil;
      this.set('searchState.node', null);
      run.later(this, 'stepSearch', 7, this.get('beat'));
      break;
    case 7:
      // found <- true;
      this.set('searchState.found', true);
      run.later(this, 'stepSearch', 12, this.get('beat'));
      break;
    case 8:
      // if item(node) > name
      if (this.get('searchState.node.value') > this.get('searchState.name')) {
        run.later(this, 'stepSearch', 9, this.get('beat'));
      } else {
        run.later(this, 'stepSearch', 10, this.get('beat'));
      }
      break;
    case 9:
      // then node <- left(node)
      this.set('searchState.node', this.get('searchState.node.left'));
      run.later(this, 'stepSearch', 12, this.get('beat'));
      break;
    case 10:
      // if item(node) < name
      if (this.get('searchState.node.value') < this.get('searchState.name')) {
        run.later(this, 'stepSearch', 11, this.get('beat'));
      } else {
        run.later(this, 'stepSearch', 12, this.get('beat'));
      }
      break;
    case 11:
      // then node <- right(node);
      this.set('searchState.node', this.get('searchState.node.right'));
      run.later(this, 'stepSearch', 12, this.get('beat'));
      break;
    case 12:
      // until node = nil
      if (this.get('searchState.node') === null) {
        run.later(this, 'stepSearch', 13, this.get('beat'));
      } else {
        run.later(this, 'stepSearch', 3, this.get('beat'));
      }
      break;
    case 13:
      // if not found
      if (this.get('searchState.found') === false) {
        run.later(this, 'stepSearch', 14, this.get('beat'));
      } else {
        run.later(this, 'endSearch', this.get('beat'));
      }
      break;
    case 14:
      // then print “No”;
      run.next(() => alert('No'));
      run.later(this, 'endSearch', this.get('beat'));
      break;
  }
}
