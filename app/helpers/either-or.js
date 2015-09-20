import Ember from 'ember';

export function eitherOr([a, b]/*, hash*/) {
  return a || b;
}

export default Ember.Helper.helper(eitherOr);
