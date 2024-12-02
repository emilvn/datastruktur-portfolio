import BST, { BSTNode } from "./binarysearchtree.js";

export default class AVLTree extends BST {
  constructor(comparatorFunction) {
    super(comparatorFunction);
  }

  /**
   * Add a value to the tree
   * @param {any} value value to add
   */
  add(value) {
    const node = new AVLNode(value);
    this.addNode(node);
  }
}

export class AVLNode extends BSTNode {
  constructor(value) {
    super(value);
  }

  /**
   * Maintains the node subtree by updating the height and rebalancing the tree
   */
  maintain() {
    this.updateHeight();
    this.rebalance();
    if (this.parent) {
      this.parent.maintain();
    }
  }

  /**
   * Returns the skew of the node subtree
   * @returns {number} negative number if skewed to the left, positive number if skewed to the right
   */
  skew() {
    const leftHeight = this._left ? this._left.height : -1;
    const rightHeight = this._right ? this._right.height : -1;
    return rightHeight - leftHeight;
  }

  /**
   * Rebalances the node subtree
   */
  rebalance() {
    const skew = this.skew();
    if (skew < -1) {
      if (this._left?.skew() > 0) {
        this._left.rotateLeft();
      }
      this.rotateRight();
    } else if (skew > 1) {
      if (this._right?.skew() < 0) {
        this._right.rotateRight();
      }
      this.rotateLeft();
    }
  }

  /**
   * rotates the node subtree to the right
   */
  rotateRight() {
    const y = this;
    const p = y.parent;
    const x = y._left;
    const b = x._right;

    if (p && p._right === y) {
      p._right = x;
    } else if (p) {
      p._left = x;
    }
    x.parent = p;

    x._right = y;
    y.parent = x;
    y._left = b;
    if (b) {
      b.parent = y;
    }

    x.updateHeight();
    y.updateHeight();
  }

  /**
   * rotates the node subtree to the left
   */
  rotateLeft() {
    const x = this;
    const p = x.parent;
    const y = x._right;
    const b = y._left;

    if (p && p._right === x) {
      p._right = y;
    } else if (p) {
      p._left = y;
    }
    y.parent = p;

    x._right = b;
    if (b) {
      b.parent = x;
    }

    y._left = x;
    x.parent = y;

    x.updateHeight();
    y.updateHeight();
  }
}
