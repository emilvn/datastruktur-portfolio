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

function test_dump() {
  const tree = makeAVLTree();
  const treeWithStrings = makeAVLTreeWithStrings();
  tree.dump();
  treeWithStrings.dump();
  return true;
}

const tests = [
  test_dump,
  test_rebalance,
  test_Iterator,
  test_custom_comparator,
];

console.log("Running AVLTree tests...");
runTests(tests);
