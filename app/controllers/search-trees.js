import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['program', 'speed'],
  program: 'SEARCH',
  speed: 'fast'
});
