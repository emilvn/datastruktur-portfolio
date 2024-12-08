import AVLTree from "./avltree.js";
import { logError, logSuccess } from "../test_helpers/log.js";
import { runTests } from "../test_helpers/test.js";
import BST from "./binarysearchtree.js";

function makeAVLTree() {
  const tree = new AVLTree();
  tree.add(10);
  tree.add(20);
  tree.add(30);
  tree.add(40);
  tree.add(50);
  tree.add(60);
  tree.add(70);
  tree.add(80);
  tree.add(90);
  return tree;
}

function makeAVLTreeWithStrings() {
  const tree = new AVLTree((a, b) => a.localeCompare(b));
  tree.add("c");
  tree.add("a");
  tree.add("b");
  tree.add("d");
  tree.add("e");
  tree.add("f");
  tree.add("g");
  tree.add("h");
  tree.add("i");
  return tree;
}

function test_rebalance() {
  const tree = makeAVLTree();
  const skews = [];
  BST.dfsIterate(tree, (node) => {
    skews.push(node.skew());
  });
  if (skews.some((s) => s > 1 || s < -1)) {
    logError("FAILED: rebalance");
    logError("\tfailed to rebalance tree");
    logError("\tExpected skew <= 1 || skew >= -1");
    logError("\tGot skew: " + skews.find((s) => s > 1 || s < -1));
    return false;
  }

  logSuccess("PASSED: rebalance");
  return true;
}

function test_Iterator() {
  const tree = makeAVLTree();
  const allValues = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  const foundValues = [];
  for (const value of tree) {
    foundValues.push(value);
  }
  const foundAllValues = allValues.every((v, i) => foundValues[i] === v);
  const noDuplicates =
    foundValues.length === allValues.length && foundAllValues;
  if (!foundAllValues) {
    logError("FAILED: Iterator");
    logError("\tFailed to find all values:");
    logError("\tExpected: " + allValues);
    logError("\tFound: " + foundValues);
    return false;
  }

  if (!noDuplicates) {
    logError("FAILED: Iterator");
    logError("\tFound duplicate values:");
    logError("\tExpected: " + allValues);
    logError("\tFound: " + foundValues);
    return false;
  }

  logSuccess("PASSED: Iterator");
  return true;
}

function test_custom_comparator() {
  const tree = makeAVLTreeWithStrings();
  const allValues = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
  const foundValues = [];
  for (const value of tree) {
    foundValues.push(value);
  }
  const foundAllValues = allValues.every((v, i) => foundValues[i] === v);
  const noDuplicates =
    foundValues.length === allValues.length && foundAllValues;
  if (!foundAllValues) {
    logError("FAILED: custom comparator");
    logError("\tFailed to find all values:");
    logError("\tExpected: " + allValues);
    logError("\tFound: " + foundValues);
    return false;
  }

  if (!noDuplicates) {
    logError("FAILED: custom comparator");
    logError("\tFound duplicate values:");
    logError("\tExpected: " + allValues);
    logError("\tFound: " + foundValues);
    return false;
  }

  logSuccess("PASSED: custom comparator");
  return true;
}

function test_first() {
  const avl = makeAVLTree();
  const first = avl.first();
  if (first !== 10) {
    logError("FAILED: first");
    logError("\tfailed to get first value in traversal order");
    logError("\tExpected: 10");
    logError("\tGot: " + first);
    return false;
  }

  logSuccess("PASSED: first");
  return true;
}

function test_last() {
  const avl = makeAVLTree();
  const last = avl.last();
  if (last !== 90) {
    logError("FAILED: last");
    logError("\tfailed to get first value in traversal order");
    logError("\tExpected: 90");
    logError("\tGot: " + last);
    return false;
  }

  logSuccess("PASSED: last");
  return true;
}

function test_getNextNode() {
  const avl = makeAVLTree();
  const node = avl.getNextNode(avl.root);
  if (node?.value !== 50) {
    logError("FAILED: getNextNode");
    logError("\tfailed to get next node");
    logError("\tExpected: 50");
    logError("\tGot: " + node?.value);
    return false;
  }

  logSuccess("PASSED: getNextNode");
  return true;
}

function test_find() {
  const avl = makeAVLTree();
  const found = avl.find(20);
  if (!found) {
    logError("FAILED: find");
    logError("\tfailed to find value in avl tree");
    logError("\tExpected: 20");
    logError("\tGot: " + found);
    return false;
  }

  logSuccess("PASSED: find");
  return true;
}

function test_getNext() {
  const avl = makeAVLTree();
  const next = avl.getNext(30);
  if (next !== 40) {
    logError("FAILED: getNext");
    logError("\tfailed to get next node");
    logError("\tExpected: 40");
    logError("\tGot: " + next?.value);
    return false;
  }

  logSuccess("PASSED: getNext");
  return true;
}

function test_remove() {
  const avl = makeAVLTree();
  const size = avl.size;
  avl.remove(40);
  if (avl.size === size) {
    logError("FAILED: remove");
    logError("\tfailed to remove value from bst");
    logError("\tExpected size: " + (size - 1));
    logError("\tGot size: " + avl.size);
    return false;
  }

  logSuccess("PASSED: remove");
  return true;
}

function test_getPrevNode() {
  const avl = makeAVLTree();
  const node = avl.getPreviousNode(avl.root);
  if (node?.value !== 30) {
    logError("FAILED: getPreviousNode");
    logError("\tfailed to get previous node");
    logError("\tExpected: 30");
    logError("\tGot: " + node?.value);
    return false;
  }

  logSuccess("PASSED: getPreviousNode");
  return true;
}

function test_getPrev() {
  const avl = makeAVLTree();
  const prev = avl.getPrevious(30);
  if (prev !== 20) {
    logError("FAILED: getPrevious");
    logError("\tfailed to get previous node");
    logError("\tExpected: 20");
    logError("\tGot: " + prev);
    return false;
  }

  logSuccess("PASSED: getPrevious");
  return true;
}

function test_dump() {
  const tree = makeAVLTree();
  const treeWithStrings = makeAVLTreeWithStrings();
  tree.dump();
  treeWithStrings.dump();
  return true;
}

export const tests = [
  test_dump,
  test_rebalance,
  test_Iterator,
  test_custom_comparator,
  test_first,
  test_last,
  test_getNextNode,
  test_find,
  test_getNext,
  test_remove,
  test_getPrevNode,
  test_getPrev,
];
// change to true to run test file seperately
if (false) {
  console.log("Running AVLTree tests...");
  runTests(tests);
}
