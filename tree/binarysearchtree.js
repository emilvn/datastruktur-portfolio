import Stack from "../stack/stack.js";

export default class BST {
  /**
   * Comparator function to use to compare nodes
   * @param {any} a
   * @param {any} b
   * @returns {number} negative number if a < b positive if a > b or 0 if equal
   */
  comparatorFunction = (a, b) => a - b;
  root = null;
  size = 0;

  /**
   * Constructor for the Binary Search Tree
   * @param {((a: any, b: any) => number) | undefined} comparatorFunction should return a negative number if a < b, 0 if a === b, and a positive number if a > b, if undefined, uses default comparator a - b
   */
  constructor(comparatorFunction) {
    if (comparatorFunction && typeof comparatorFunction === "function") {
      this.comparatorFunction = comparatorFunction;
    }
  }

  /**
   * Iterates over a tree using depth first scan
   * @param {BST} tree tree to iterate over
   * @param {(current: BSTNode) => void} cb callback function to call on each node
   */
  static dfsIterate(tree, cb) {
    BST.dfs(tree.root, cb);
  }

  /**
   * Iterator for iterating through the tree in traversal order using depth first scan
   * Uses a generator function to iterate through the tree, yielding each value
   * @returns {Iterator} iterator
   */
  [Symbol.iterator] = function* () {
    const stack = new Stack();
    let current = this.root;
    while (current || stack.size() > 0) {
      // go as deep as possible to the left
      while (current) {
        stack.push(current);
        current = current.left;
      }
      // pop the leftmost node
      current = stack.pop();
      // yield the value
      yield current.value;
      // go to the right node
      current = current.right;
    }
  };

  /**
   * Iterates over node subtree using depth first scan
   * @param {BSTNode} node current node to start the DFS from
   * @param {(current: BSTNode) => void} cb callback function to call on each node
   * @returns
   */
  static dfs(node, cb) {
    if (!node) {
      return;
    }

    this.dfs(node.left, cb);
    cb(node);
    this.dfs(node.right, cb);
  }

  /**
   * Gets value of first node in traversal-order
   * @returns {any} value of first node
   */
  first() {
    let current = this.root;
    while (current.left) {
      current = current.left;
    }
    return current.value;
  }

  /**
   * Gets value of last node in traversal-order
   * @returns {any} value of last node
   */
  last() {
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current.value;
  }

  /**
   * Finds the next node in traversal order after a node
   * @param {BSTNode} node the node to find the next of
   * @returns {BSTNode | null} the next node or null if not found
   */
  getNextNode(node) {
    if (!node) {
      return null;
    }
    // if node has a right child, the next node is the leftmost child of the nodes right child
    if (node.right) {
      let current = node.right;
      while (current.left) {
        current = current.left;
      }
      return current;
    }
    // if node has no right child, the next node is the first parent node that the node is a left child of
    let current = node;
    while (current.parent && current === current.parent.right) {
      current = current.parent;
    }
    return current.parent;
  }

  /**
   * Finds the next value in traversal order after a value
   * @param {any} value the value to find the next of
   * @returns {any | undefined} the next value or undefined if not found
   */
  getNext(value) {
    const node = this.find(value);
    if (!node) return;
    const next = this.getNextNode(node);
    return next?.value;
  }

  /**
   * Finds node with specific value
   * @param {any} value value to look for node with
   * @returns {BSTNode | undefined} node with value or undefined if not found
   */
  find(value) {
    let current = this.root;
    while (current) {
      const c = this.comparatorFunction(value, current.value);
      if (c === 0) {
        return current;
      }
      if (c > 0) {
        current = current.right;
      } else if (c < 0) {
        current = current.left;
      }
    }
    // not found
    return;
  }

  /**
   * Finds the previous node in traversal order before a node
   * @param {BSTNode} node the node to find the previous of
   * @returns {BSTNode | null} the previous node or null if not found
   */
  getPreviousNode(node) {
    if (!node) {
      return null;
    }
    // if node has a left child, the next node is the rightmost child of the nodes left child
    if (node.left) {
      let current = node.left;
      while (current.right) {
        current = current.right;
      }
      return current;
    }
    // if node has no left child, the next node is the first parent node that the node is a right child of
    let current = node;
    while (current.parent && current === current.parent.left) {
      current = current.parent;
    }
    return current.parent;
  }

  /**
   * Finds the previous value in traversal order before a value
   * @param {any} value the value to find the previous of
   * @returns {any | undefined} the previous value or undefined if not found
   */
  getPrevious(value) {
    const node = this.find(value);
    if (!node) return;
    const previous = this.getPreviousNode(node);
    return previous?.value;
  }

  /**
   * Adds a node to the tree
   * @param {BSTNode} node node to add
   */
  addNode(node) {
    let curr = this.root;
    if (!curr) {
      this.size++;
      this.root = node;
      return;
    }
    while (curr) {
      const c = this.comparatorFunction(node.value, curr.value);
      if (c === 0) {
        return;
      }
      if (c > 0) {
        if (!curr.right) {
          this.size++;
          curr.right = node;
          // if the root node has a parent node, a rebalance was made and the root is now the parent of previous root
          if (this.root.parent) {
            this.root = this.root.parent;
          }
          break;
        } else {
          curr = curr.right;
        }
      } else if (c < 0) {
        if (!curr.left) {
          this.size++;
          curr.left = node;
          // if the root node has a parent node, a rebalance was made and the root is now the parent of previous root
          if (this.root.parent) {
            this.root = this.root.parent;
          }
          break;
        } else {
          curr = curr.left;
        }
      }
    }
  }

  /**
   * Removes a value from the BST, without removing the child nodes of the removed node
   * @param {any} value to remove
   */
  remove(value) {
    const node = this.find(value);
    if (!node) {
      return;
    }
    const parent = node.parent;
    // if the node has no parent, it is the root node
    if (!parent) {
      // preserve the child nodes of the root node and replace the root node with one of them
      if (node.left) {
        // set the left child as the new root node
        this.root = node.left;
        // find the rightmost node of the new root
        let rightmost = node.left;
        while (rightmost.right) {
          rightmost = rightmost.right;
        }
        // set the removed nodes right child as the rightmost nodes right child
        rightmost.right = node.right;
      } else {
        // if the left child is null, set the right child as the new root node
        // this will preserve the entire sub tree as the left is null
        // set the right child as the new root node
        this.root = node.right;
      }
      this.size--;
      return;
    }
    parent.removeChild(node);
    this.size--;
  }

  /**
   * Adds a value to the tree
   * @param {any} value value to add
   */
  add(value) {
    const node = new BSTNode(value);
    this.addNode(node);
  }

  dump() {
    this.root.dump();
  }
}

export class BSTNode {
  parent = null;
  _right = null;
  _left = null;
  height = 0;
  value;

  constructor(value) {
    this.value = value;
  }

  get right() {
    return this._right;
  }
  get left() {
    return this._left;
  }

  /**
   * sets the right child of the node, and maintains the height of the node subtree
   * @param {BSTNode} node
   */
  set right(node) {
    this._right = node;
    if (node) {
      node.parent = this;
    }
    this.maintain();
  }
  /**
   * sets the left child of the node, and maintains the height of the node subtree
   * @param {BSTNode} node
   */
  set left(node) {
    this._left = node;
    if (node) {
      node.parent = this;
    }
    this.maintain();
  }

  /**
   * Removes child node while keeping the child nodes of the removed node
   * @param {BSTNode} node node to remove
   */
  removeChild(node) {
    if (this._left === node) {
      if (node.left) {
        // if the node has a left child, set the left child as the left child of the parent
        this.left = node.left;
        // find the rightmost node of the removed nodes left child
        let rightmost = node.left;
        while (rightmost.right) {
          rightmost = rightmost.right;
        }
        // set the removed nodes right child as the rightmost nodes right child
        rightmost.right = node.right;
      } else {
        this.left = node.right;
      }
    } else if (this._right === node) {
      if (node.right) {
        this.right = node.right;
        let leftmost = node.right;
        while (leftmost.left) {
          leftmost = leftmost.left;
        }
        leftmost.left = node.left;
      } else {
        this.right = node.left;
      }
    }
    this.maintain();
  }

  /**
   * maintain the height of the node subtree
   */
  maintain() {
    this.updateHeight();
  }

  /**
   * Updates the height of the node subtree
   */
  updateHeight() {
    const leftHeight = this._left ? this._left.height : -1;
    const rightHeight = this._right ? this._right.height : -1;
    this.height = Math.max(leftHeight, rightHeight) + 1;
  }

  dump() {
    // Print the tree in a nice way - by creating a (jagged) 2D array of the tree
    // each level (starting from root) is an array in the array that doubles in size from the previous level

    // breaks if the tree is too deep - but that's a problem for another day

    // Use DFS to fill array with values
    const treeArray = [];
    let height = 0; // and while we're at it, calculate the height of the tree
    buildTreeArray(this, 0, 0);

    // Does a Depth-First-Scan of the Tree,
    // keeping track of the current depth (how far down from the top)
    // and the current indent (how far right from the (possible) left-most node at this depth)
    // stores the node values in a 2D array
    function buildTreeArray(node, depth, indent) {
      if (!node) {
        return;
      }
      height = Math.max(height, depth);
      // insert this node value in the 2D array
      if (!treeArray[depth]) treeArray[depth] = [];
      treeArray[depth][indent] = node.value;
      // visit its children - remember to double indent
      buildTreeArray(node.left, depth + 1, indent * 2);
      buildTreeArray(node.right, depth + 1, indent * 2 + 1);
    }

    // Apparently I'm not smart enough to calculate these, so here's a pre-calculated list
    const indentations = [1, 2, 5, 11, 23, 46, 93];

    let treeString = " ";
    // Display array - one level at a time
    for (let depth = 0; depth < treeArray.length; depth++) {
      const values = treeArray[depth];

      // Calculate indent for this depth (or find it in the pre-calculated table)
      let currentHeight = height - depth; // currentHeight is the distance from the bottom of the tree
      let indent = indentations[currentHeight];

      // Only display tree structure if we are not at the top
      if (depth > 0) {
        // Loop through half the values - and show a subtree with left and right
        for (let i = 0; i < values.length / 2; i++) {
          treeString += " ".repeat(indent);
          // Only show sub-tree if there are some values below
          if (values[i * 2] != undefined || values[i * 2 + 1] != undefined) {
            treeString += "┌";
            treeString += "─".repeat(indent > 1 ? indent : 0);
            treeString += "┴";
            treeString += "─".repeat(indent > 1 ? indent : 0);
            treeString += "┐";
          } else {
            treeString += "   " + "  ".repeat(indent > 1 ? indent : 0);
          }
          treeString += " ".repeat(indent);
          // add a single space before the next "block"
          treeString += " ";
        }
        // and finalize the current line
        treeString += "\n";
      }

      // Indent numbers one less than their "tree drawings"
      // Unless it is the first one, then it is two (or maybe three) less ... mystic math!
      if (depth == 0) {
        treeString += " ".repeat(indent - 2);
      } else {
        treeString += " ".repeat(indent - 1);
      }

      // display values
      for (let i = 0; i < values.length; i++) {
        // if both children are undefined, don't show any of then
        // if only one child is, show it as underscores _
        const showUndefined =
          !values[i - (i % 2)] && !values[i - (i % 2) + 1] ? " " : "_";
        // if depth is lowest (height-1) - pad values to two characters
        if (depth == height) {
          treeString += String(values[i] ?? showUndefined.repeat(2)).padStart(
            2,
            " "
          );
          // and add a single space
          treeString += " ";
        } else {
          // otherwise center values in block of three
          treeString += String(values[i] ?? showUndefined.repeat(3))
            .padEnd(2, " ")
            .padStart(3, " ");

          // and add twice the indentation of spaces + 1 in the middle
          treeString += " ".repeat(indent - 1);
          treeString += " ";
          treeString += " ".repeat(indent - 1);
        }
      }

      // finalize the value-line
      treeString += "\n";
    }

    console.log(treeString);
  }
}
