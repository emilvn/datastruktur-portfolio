import { logError, logSuccess } from "../test_helpers/log.js";
import { runTests } from "../test_helpers/test.js";
import Stack, { Node } from "./stack.js";

function makeStack() {
  const a = new Node("A");
  const b = new Node("B");
  const c = new Node("C");

  const stack = new Stack(a, b, c);
  return stack;
}

function test_Iterator() {
  const stack = makeStack();
  const allValues = ["A", "B", "C"];
  const foundValues = [];
  for (const data of stack) {
    foundValues.push(data);
  }
  const foundAllValues = allValues.every((v) => foundValues.includes(v));
  if (!foundAllValues) {
    logError("FAILED: Iterator");
    logError("\tFailed to find all values:");
    logError("\tExpected: " + allValues);
    logError("\tFound: " + foundValues);
    return false;
  }
  const noDuplicates =
    foundValues.length === allValues.length && foundAllValues;
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

function test_get() {
  const stack = makeStack();
  const data = stack.get(1);
  if (data !== "B") {
    logError("FAILED: get");
    logError("\tfailed to get data at index 1");
    logError("\tExpected: B");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: get");
  return true;
}

function test_push() {
  const stack = makeStack();
  stack.push("D");
  const data = stack.peek();
  if (data !== "D") {
    logError("FAILED: push");
    logError("\tfailed to push data to stack:");
    logError("\tExpected: D");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: push");
  return true;
}

function test_peek() {
  const stack = makeStack();
  const data = stack.peek();
  if (data !== "C") {
    logError("FAILED: peek");
    logError("\tfailed to peek top of stack:");
    logError("\tExpected: C");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: peek");
  return true;
}

function test_pop() {
  const stack = makeStack();
  const data = stack.pop();
  if (data !== "C") {
    logError("FAILED: pop");
    logError("\tfailed to pop top of stack:");
    logError("\tExpected: C");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: pop");
  return true;
}

function test_pushNode() {
  const stack = makeStack();
  const d = new Node("D");
  stack.pushNode(d);
  const data = stack.peek();
  if (data !== "D") {
    logError("FAILED: pushNode");
    logError("\tfailed to push node to stack:");
    logError("\tExpected: D");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: pushNode");
  return true;
}

function test_peekNode() {
  const stack = makeStack();
  const node = stack.peekNode();
  if (node.data !== "C") {
    logError("FAILED: peekNode");
    logError("\tfailed to peek top of stack:");
    logError("\tExpected: C");
    logError("\tFound: " + node.data);
    return false;
  }

  logSuccess("PASSED: peekNode");
  return true;
}

function test_popNode() {
  const stack = makeStack();
  const node = stack.popNode();
  if (node.data !== "C") {
    logError("FAILED: popNode");
    logError("\tfailed to pop top of stack:");
    logError("\tExpected: C");
    logError("\tFound: " + node.data);
    return false;
  }

  logSuccess("PASSED: popNode");
  return true;
}

function test_size() {
  const stack = makeStack();
  const size = stack.size();
  if (size !== 3) {
    logError("FAILED: size");
    logError("\tfailed to get correct size:");
    logError("\tExpected: 3");
    logError("\tFound: " + size);
    return false;
  }

  logSuccess("PASSED: size");
  return true;
}

function test_dump() {
  const stack = makeStack();
  stack.dump();
  return true;
}

const tests = [
  test_dump,
  test_Iterator,
  test_get,
  test_push,
  test_peek,
  test_pop,
  test_pushNode,
  test_peekNode,
  test_popNode,
  test_size,
];

console.log("Running Stack tests...");

runTests(tests);
