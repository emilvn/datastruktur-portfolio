import FixedStack from "./fixedstack.js";
import { logError, logSuccess } from "../test_helpers/log.js";
import { runTests } from "../test_helpers/test.js";

function makeStack() {
  const stack = new FixedStack(3);
  return stack;
}

function test_push() {
  const stack = makeStack();
  stack.push("A");
  stack.push("B");
  stack.push("C");
  const data = stack.get(2);
  if (data !== "C") {
    logError("FAILED: push");
    logError("\tfailed to push data onto the stack");
    logError("\tExpected: C");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: push");
  return true;
}

function test_pop() {
  const stack = makeStack();
  stack.push("A");
  stack.push("B");
  stack.push("C");
  const data = stack.pop();
  if (data !== "C") {
    logError("FAILED: pop");
    logError("\tfailed to pop data from the stack");
    logError("\tExpected: C");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: pop");
  return true;
}

function test_peek() {
  const stack = makeStack();
  stack.push("A");
  stack.push("B");
  stack.push("C");
  const data = stack.peek();
  if (data !== "C") {
    logError("FAILED: peek");
    logError("\tfailed to peek at top of stack");
    logError("\tExpected: C");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: peek");
  return true;
}

function test_size() {
  const stack = makeStack();
  stack.push("A");
  stack.push("B");
  stack.push("C");
  const size = stack.size();
  if (size !== 3) {
    logError("FAILED: size");
    logError("\tfailed to get size of stack");
    logError("\tExpected: 3");
    logError("\tFound: " + size);
    return false;
  }

  logSuccess("PASSED: size");
  return true;
}

function test_get() {
  const stack = makeStack();
  stack.push("A");
  stack.push("B");
  stack.push("C");
  const data = stack.get(1);
  if (data !== "B") {
    logError("FAILED: get");
    logError("\tfailed to get data from stack");
    logError("\tExpected: B");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: get");
  return true;
}

const tests = [test_push, test_pop, test_peek, test_size, test_get];

console.log("Running Fixed Stack tests...");
runTests(tests);
