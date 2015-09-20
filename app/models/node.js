export default class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  get id() {
    return this.value.toLowerCase().replace(/\s+/, '_');
  }
}
