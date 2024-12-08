import { runTests } from "../test_helpers/test.js";
import Queue, { Node } from "./queue.js";
import { logError, logSuccess } from "../test_helpers/log.js";

function makeQueue() {
  const a = new Node("A");
  const b = new Node("B");
  const c = new Node("C");

  const queue = new Queue(a, b, c);
  return queue;
}

function test_Iterator() {
  const queue = makeQueue();
  const allValues = ["A", "B", "C"];
  const foundValues = [];
  for (const data of queue) {
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

function test_enqueue() {
  const queue = makeQueue();
  queue.enqueue("D");
  const data = queue.peek();
  if (data !== "A") {
    logError("FAILED: enqueue");
    logError("\tfailed to enqueue data");
    logError("\tExpected: A");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: enqueue");
  return true;
}

function test_dequeue() {
  const queue = makeQueue();
  const data = queue.dequeue();
  if (data !== "A") {
    logError("FAILED: dequeue");
    logError("\tfailed to dequeue data");
    logError("\tExpected: A");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: dequeue");
  return true;
}

function test_size() {
  const queue = makeQueue();
  const size = queue.size();
  if (size !== 3) {
    logError("FAILED: size");
    logError("\tfailed to get correct size");
    logError("\tExpected: 3");
    logError("\tFound: " + size);
    return false;
  }

  logSuccess("PASSED: size");
  return true;
}

function test_peek() {
  const queue = makeQueue();
  const data = queue.peek();
  if (data !== "A") {
    logError("FAILED: peek");
    logError("\tfailed to peek data");
    logError("\tExpected: A");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: peek");
  return true;
}

function test_clear() {
  const queue = makeQueue();
  queue.clear();
  const size = queue.size();
  if (size !== 0) {
    logError("FAILED: clear");
    logError("\tfailed to clear queue");
    logError("\tExpected: 0");
    logError("\tFound: " + size);
    return false;
  }

  logSuccess("PASSED: clear");
  return true;
}

function test_get() {
  const queue = makeQueue();
  const data = queue.get(1);
  if (data !== "B") {
    logError("FAILED: get");
    logError("\tfailed to get data");
    logError("\tExpected: B");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: get");
  return true;
}

function test_dump() {
  const queue = makeQueue();
  queue.dump();
  return true;
}

export const tests = [
  test_dump,
  test_Iterator,
  test_enqueue,
  test_dequeue,
  test_size,
  test_peek,
  test_clear,
  test_get,
];

// change to true to run test file seperately
if (false) {
  console.log("Running Queue tests...");
  runTests(tests);
}
