import { logError, logSuccess } from "../test_helpers/log.js";
import { runTests } from "../test_helpers/test.js";
import BST from "./binarysearchtree.js";

function makeBST() {
  const bst = new BST();
  bst.add(30);
  bst.add(10);
  bst.add(20);
  bst.add(40);
  bst.add(50);

  return bst;
}

function makeBSTWithStrings() {
  const bst = new BST((a, b) => a.localeCompare(b));
  bst.add("c");
  bst.add("a");
  bst.add("b");
  bst.add("d");
  bst.add("e");

  return bst;
}

function test_add() {
  const bst = makeBST();
  const size = bst.size;
  bst.add(51);
  if (bst.size === size) {
    logError("FAILED: add");
    logError("\tfailed to add value to bst");
    logError("\tExpected size: " + size + 1);
    logError("\tGot size: " + bst.size);
    bst.dump();
    return false;
  }

  logSuccess("PASSED: add");
  return true;
}

function test_doesnt_add_existing() {
  const bst = makeBST();
  const size = bst.size;
  bst.add(50);
  if (bst.size !== size) {
    logError("FAILED: add (value exists)");
    logError("\tfailed to not add existing value to bst");
    logError("\tExpected size: " + size);
    logError("\tGot size: " + bst.size);
    bst.dump();
    return false;
  }

  logSuccess("PASSED: add (value exists)");
  return true;
}

function test_Iterator() {
  const bst = makeBST();
  const allValues = [10, 20, 30, 40, 50];
  const foundValues = [];
  for (const value of bst) {
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

function test_dfs() {
  const bst = makeBST();
  const allValues = [10, 20, 30, 40, 50];
  const foundValues = [];
  BST.dfsIterate(bst, (n) => {
    foundValues.push(n.value);
  });
  const foundAllValues = allValues.every((v) => foundValues.includes(v));
  const noDuplicates =
    foundValues.length === allValues.length && foundAllValues;
  if (!foundAllValues) {
    logError("FAILED: dfs");
    logError("\tfailed to find all values during dfs");
    logError("\tExpected: " + allValues);
    logError("\tGot: " + foundValues);
    return false;
  }

  if (!noDuplicates) {
    logError("FAILED: dfs");
    logError("\tfound duplicates during dfs");
    logError("\tExpected: " + allValues);
    logError("\tGot: " + foundValues);
    return false;
  }

  logSuccess("PASSED: dfs");
  return true;
}

function test_custom_comparator() {
  const bst = makeBSTWithStrings();
  const allValues = ["a", "b", "c", "d", "e"];
  const foundValues = [];
  for (const value of bst) {
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
  const bst = makeBST();
  const first = bst.first();
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
  const bst = makeBST();
  const last = bst.last();
  if (last !== 50) {
    logError("FAILED: last");
    logError("\tfailed to get first value in traversal order");
    logError("\tExpected: 50");
    logError("\tGot: " + last);
    return false;
  }

  logSuccess("PASSED: last");
  return true;
}

function test_getNextNode() {
  const bst = makeBST();
  const node = bst.getNextNode(bst.root);
  if (node?.value !== 40) {
    logError("FAILED: getNextNode");
    logError("\tfailed to get next node");
    logError("\tExpected: 40");
    logError("\tGot: " + node?.value);
    return false;
  }

  logSuccess("PASSED: getNextNode");
  return true;
}

function test_find() {
  const bst = makeBST();
  const found = bst.find(20);
  if (!found || found.value !== 20) {
    logError("FAILED: find");
    logError("\tfailed to find value in bst");
    logError("\tExpected: 20");
    logError("\tGot: " + found);
    return false;
  }

  logSuccess("PASSED: find");
  return true;
}

function test_getNext() {
  const bst = makeBST();
  const next = bst.getNext(30);
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
  const bst = makeBST();
  bst.add(35);
  bst.add(45);
  bst.add(37);
  bst.add(39);
  bst.add(31);

  bst.remove(30);

  const allValues = [10, 20, 40, 50, 35, 45, 37, 39, 31];
  const foundValues = [];

  for (const v of bst) {
    foundValues.push(v);
  }

  if (
    !allValues.every((v) => foundValues.includes(v)) &&
    !foundValues.every((v) => allValues.includes(v))
  ) {
    logError("FAILED: remove");
    logError("\tfailed to remove value from bst");
    logError("\tExpected values: " + allValues);
    logError("\tGot values: " + foundValues);
    return false;
  }

  logSuccess("PASSED: remove");
  return true;
}

function test_getPrevNode() {
  const bst = makeBST();
  const node = bst.getPreviousNode(bst.root);
  if (node?.value !== 20) {
    logError("FAILED: getPreviousNode");
    logError("\tfailed to get previous node");
    logError("\tExpected: 20");
    logError("\tGot: " + node?.value);
    return false;
  }

  logSuccess("PASSED: getPreviousNode");
  return true;
}

function test_getPrev() {
  const bst = makeBST();
  const prev = bst.getPrevious(30);
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
  const bst = makeBST();
  const bstStr = makeBSTWithStrings();
  bst.dump();
  bstStr.dump();
  return true;
}

export const tests = [
  test_dump,
  test_add,
  test_doesnt_add_existing,
  test_dfs,
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
  console.log("Running BST tests...");
  runTests(tests);
}
