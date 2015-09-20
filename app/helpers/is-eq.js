import Ember from 'ember';

export function isEq([a, b]) {
  return a === b;
}

export default Ember.Helper.helper(isEq);
