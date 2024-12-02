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

function test_dump() {
  const bst = makeBST();
  const bstStr = makeBSTWithStrings();
  bst.dump();
  bstStr.dump();
  return true;
}

const tests = [
  test_dump,
  test_add,
  test_doesnt_add_existing,
  test_dfs,
  test_Iterator,
  test_custom_comparator,
];

console.log("Running BST tests...");
runTests(tests);
