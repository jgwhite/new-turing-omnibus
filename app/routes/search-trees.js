import Ember from 'ember';
import Node from '../models/node';

const CHOMSKY = new Node('Chomsky', null, null);
const CODD = new Node('Codd', null, null);
const DIJKSTRA = new Node('Dijkstra', null, null);
const KLEENE = new Node('Kleene', null, null);
const MCCARTHY = new Node('McCarthy', null, null);
const MINSKY = new Node('Minsky', null, null);
const TURING = new Node('Turing', null, null);
const WIENER = new Node('Wiener', null, null);
const CHURCH = new Node('Church', CHOMSKY, CODD);
const HOARE = new Node('Hoare', DIJKSTRA, KLEENE);
const MICHIE = new Node('Michie', MCCARTHY, MINSKY);
const VON_NEUMANN = new Node('Von Neumann', TURING, WIENER);
const COOK = new Node('Cook', CHURCH, HOARE);
const SHANNON = new Node('Shannon', MICHIE, VON_NEUMANN);
const KNUTH = new Node('Knuth', COOK, SHANNON);

export default Ember.Route.extend({
  model() {
    return KNUTH;
  }
});
