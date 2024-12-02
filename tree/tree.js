import Queue from "../queue/queue.js";
import Stack from "../stack/stack.js";

export default class Tree {
  root;

  constructor(value) {
    this.root = new TreeNode(value);
  }

  /**
   * Iterates over the tree using breadth first scan
   * @param {Tree} tree tree to iterate over
   * @param {(current: TreeNode, stack: Stack, depth: number) => void} cb callback function to call on each node
   */
  static bfsIterate(tree, cb) {
    const queue = new Queue();
    let start = tree.root;
    let current = start;
    queue.enqueue(current);
    while (queue.size() > 0) {
      current = queue.dequeue();
      cb(current, queue);
      if (current.childNodes.length > 0) {
        current.childNodes.forEach((b) => {
          queue.enqueue(b);
        });
      }
    }
  }

  /**
   * Iterates over the tree using depth first scan
   * @param {Tree} tree tree to iterate over
   * @param {(current: TreeNode, stack: Stack, depth: number) => void} cb callback function to call on each node
   */
  static dfsIterate(tree, cb) {
    const stack = new Stack();
    const visited = new Set();
    let current = tree.root;
    stack.push({ node: current, depth: 0 });
    while (stack.size() > 0) {
      const { node, depth } = stack.pop();
      if (!visited.has(node.id)) {
        cb(node, stack, depth);
        visited.add(node.id);
      }
      if (node.childNodes.length > 0) {
        // start from end to make the childNodes be processed in the correct order as we are using a stack
        for (let i = node.childNodes.length - 1; i >= 0; i--) {
          const b = node.childNodes[i];
          if (!visited.has(b.id)) {
            stack.push({ node: b, depth: depth + 1 });
          }
        }
      }
    }
  }

  /**
   * Get numbers of layers in the tree, starting from 0 for the root layer
   * @returns {number} the number of layers in the tree
   */
  get layerCount() {
    let maxLayer = 0;
    Tree.dfsIterate(this, (current, _, depth) => {
      maxLayer = Math.max(maxLayer, depth);
    });
    return maxLayer;
  }

  /**
   * Creates a new TreeNode with the given value and appends it to the root node child nodes
   * @param {any} value the value to add to the tree
   */
  addValue(value) {
    const node = new TreeNode(value);
    this.root.appendChild(node);
  }

  /**
   * Finds and returns the first node with the given value, starting from the root
   * uses breadth first search, so the first node found will be the one closest to the root
   * @param {any} value the value to find in the tree
   * @returns {TreeNode | null} the first node found with the given value, or null if not found
   */
  findValue(value) {
    let found = null;
    Tree.bfsIterate(this, (current) => {
      if (current.value === value && !found) {
        found = current;
      }
    });
    return found;
  }

  /**
   * Removes the first node found with the given value
   * @param {any} value the value to remove from the tree
   */
  removeValue(value) {
    const node = this.findValue(value);
    if (!node) return;
    const parent = node.parent;
    if (!parent) return;
    parent.removeChild(node);
  }

  /**
   * Returns a string representation of the tree using a visual tree format, kind of like a file system tree
   * @returns {string} a string representation of the tree
   */
  toString() {
    if (this.root.childNodes.length === 0) return "";
    let str = "";
    this.root.layer = 0;
    const branchTracker = [];
    Tree.dfsIterate(this, (current, _, depth) => {
      while (branchTracker.length <= depth) {
        branchTracker.push(false);
      }
      let indents = "";
      for (let i = 0; i < depth; i++) {
        indents += branchTracker[i] ? "│  " : "   ";
      }
      const parent = current.parent;
      if (parent) {
        const isLastBranch =
          parent.childNodes[parent.childNodes.length - 1] === current;
        if (isLastBranch) {
          str += indents + "└─ ";
          branchTracker[depth] = false;
        } else {
          str += indents + "├─ ";
          branchTracker[depth] = true;
        }
      }
      str += current.value + "\n";
    });
    return str;
  }

  dump() {
    console.log(this + "");
  }
}

export class TreeNode {
  static ID_COUNTER = 1;
  parent = null;
  childNodes = [];
  value;
  constructor(value) {
    this.value = value;
    this.id = TreeNode.ID_COUNTER;
    TreeNode.ID_COUNTER++;
  }

  get firstChild() {
    return this.childNodes[0];
  }

  get lastChild() {
    return this.childNodes[this.childNodes.length - 1];
  }

  get hasChildNodes() {
    return this.childNodes.length > 0;
  }

  appendChild(node) {
    node.parent = this;
    this.childNodes.push(node);
  }

  appendChildren(...nodes) {
    nodes.forEach(this.appendChild);
    this.childNodes.push(...nodes);
  }

  removeChild(node) {
    const index = this.childNodes.indexOf(node);
    if (index > -1) {
      this.childNodes.splice(index, 1);
    }
  }

  replaceChild(newNode, oldNode) {
    const index = this.childNodes.indexOf(oldNode);
    if (index > -1) {
      this.childNodes[index] = newNode;
    }
    newNode.parent = this;
  }
}
