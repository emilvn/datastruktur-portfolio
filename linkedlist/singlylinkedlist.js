export default class SinglyLinkedList {
  /**
   * First element of list
   */
  head = null;
  /**
   * Last element of list
   */
  tail = null;

  /**
   * @param  {...Node} nodes list of nodes to store in SinglyLinkedList on construction. Will be stored in the same order as args.
   */
  constructor(...nodes) {
    // Insert nodes starting with tail to match indices in linked list to the order of the args
    if (nodes.length > 0) {
      this.head = nodes[0];
      this.tail = nodes[0];
      for (let i = 1; i < nodes.length; i++) {
        const current = nodes[i];
        this.tail.next = current;
        this.tail = current;
      }
    }
  }

  /**
   * Creates new node with data and adds it as the first node of the list
   * @param {any} data data to be stored in node
   */
  add(data) {
    const node = new Node(data);
    if (!this.head) {
      this.clear();
      return;
    }

    node.next = this.head;
    this.head = node;
  }

  /**
   * Finds node by data and removes it from the list
   * @param {any} data data of node to remove
   */
  remove(data) {
    let node = this.head;
    let found = false;
    while (node) {
      if (node.data === data) {
        found = true;
        break;
      }
      node = node.next;
    }
    if (found) {
      this.removeNode(node);
    }
  }

  /**
   * Gets data of first node/head of list
   * @returns {any | undefined} data of first node/head of list
   */
  getFirst() {
    return this.head?.data;
  }

  /**
   * Gets data of last node/tail of list
   * @returns {any | undefined} data of last node/tail of list
   */
  getLast() {
    return this.tail?.data;
  }

  //NODE SPECIFIC OPERATIONS

  /**
   * Gets first node/head of list
   * @returns {Node | undefined} first node/head of list
   */
  getFirstNode() {
    return this.head;
  }

  /**
   * Gets next node
   * @param {Node} node
   * @returns {Node | undefined} next node
   */
  getNextNode(node) {
    if (!node) {
      return this.head;
    }
    return node.next;
  }

  /**
   * Gets last node/tail of list
   * @returns {Node | undefined} last node/tail of list
   */
  getLastNode() {
    return this.tail;
  }

  /**
   * Gets node with given data
   * @param {any} data data of node to get
   * @returns {Node | null} node with given data or null if not found
   */
  getNodeWith(data) {
    let node = this.head;
    while (node) {
      if (node.data === data) {
        return node;
      }
      node = node.next;
    }
    return null;
  }

  /**
   * Removes first node/head of list
   */
  removeFirstNode() {
    if (this.head === this.tail) {
      this.clear();
      return;
    }

    this.head = this.head.next;
  }

  /**
   * Removes last node/tail of list
   */
  removeLastNode() {
    if (this.head === this.tail) {
      this.clear();
      return;
    }

    let newTail = this.head;
    while (newTail) {
      if (newTail.next === this.tail) {
        this.tail = newTail;
        this.tail.next = null;
        return;
      }
      newTail = newTail.next;
    }
  }

  /**
   * Removes node from list
   * @param {Node} node node to remove
   */
  removeNode(node) {
    let prevNode = this.head;
    if (prevNode === node) {
      this.removeFirstNode();
      return;
    }

    while (prevNode) {
      if (prevNode.next === node) {
        prevNode.next = node.next;
        return;
      }
      prevNode = prevNode.next;
    }
  }

  // Helpers

  /**
   * Clears list
   */
  clear() {
    this.head = null;
    this.tail = null;
  }

  /**
   * Gets size of list
   * @returns {number} size of list
   */
  size() {
    let node = this.head;
    let size = 0;
    while (node) {
      size++;
      node = node.next;
    }
    return size;
  }

  /**
   * Prints list to console, primarily for debugging
   */
  dumpList() {
    let node = this.head;
    let output = node?.data;
    while (node) {
      if (node !== this.head) {
        output += " -> " + node.data;
      }
      node = node.next;
    }
    console.log("Head: " + this.head?.data);
    console.log("Tail: " + this.tail?.data);
    console.log("List: " + output);
  }
}

/**
 * Class for SinglyLinkedList nodes
 */
class Node {
  next = null;
  data;

  constructor(data) {
    this.data = data;
  }
}
