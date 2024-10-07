export default class Stack {
  _size = 0;
  /**
   * @param  {...Node} nodes list of nodes to store in Stack on construction. Will be stored in the same order as args.
   */
  constructor(...nodes) {
    if (nodes.length > 0) {
      this.head = nodes[0];
      for (let i = 1; i < nodes.length; i++) {
        const current = nodes[i];
        current.next = this.head;
        this.head = current;
      }
    }
    this._size = nodes.length;
  }

  /**
   * Returns an iterator that allows you to iterate over the stack
   * @returns {Iterator} iterator
   */
  [Symbol.iterator]() {
    let current = this.head;
    return {
      next() {
        if (!current) {
          return { done: true };
        }
        const data = current.data;
        current = current.next;
        return { value: data, done: false };
      },
    };
  }

  /**
   * Gets data at given index in stack
   * @param {number} index
   * @returns {unknown | undefined} data at index in stack or undefined if not found
   */
  get(index) {
    let node = this.head;
    let i = 0;
    while (node) {
      if (i === index) {
        return node.data;
      }
      node = node.next;
      i++;
    }
    return undefined;
  }

  /**
   * Adds data to the top of the stack
   * @param {any} data data to push to the stack
   */
  add(data) {
    const node = new Node(data);
    this.addNode(node);
  }

  /**
   * Gets data at the top of the stack without removing it
   * @returns {unknown | undefined} data from top of the stack
   */
  getTop() {
    return this.head?.data;
  }

  /**
   * Removes and returns data from the top of the stack
   * @returns {unknown | undefined} data from the removed top of the stack
   */
  removeTop() {
    return this.removeTopNode()?.data;
  }

  /**
   * Adds node to top of the stack
   * @param {Node} node
   */
  addNode(node) {
    node.next = this.head;
    this.head = node;
    this._size++;
  }

  /**
   * Gets node at top of the stack, without removing it
   * @returns {Node | null} node at the top of the stack
   */
  getTopNode() {
    return this.head;
  }

  /**
   * Removes and returns node at top of the stack
   * @returns {Node | null} the removed top node
   */
  removeTopNode() {
    if (!this.head) return null;
    const node = this.head;
    this.head = this.head.next;
    this._size--;
    return node;
  }

  /**
   * Gets current size of the stack
   * @returns {number} size of stack
   */
  size() {
    return this._size;
  }

  /**
   * Clears stack
   */
  clear() {
    this.head = null;
    this._size = 0;
  }

  /**
   * Prints stack to console, primarily for debugging
   */
  dump() {
    let node = this.head;
    let output = node?.data;
    while (node) {
      if (node !== this.head) {
        output += " <- " + node.data;
      }
      node = node.next;
    }
    console.log("Top: " + this.head?.data);
    console.log("Stack: " + output);
  }
}

class Node {
  data;
  next = null;
  constructor(data) {
    this.data = data;
  }
}
