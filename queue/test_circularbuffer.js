import CircularBuffer from "./circularbuffer.js";
import { logError, logSuccess } from "../test_helpers/log.js";
import { runTests } from "../test_helpers/test.js";

function makeBuffer() {
  const buffer = new CircularBuffer(3);
  return buffer;
}

function test_enqueue() {
  const buffer = makeBuffer();
  buffer.enqueue("A");
  buffer.enqueue("B");
  buffer.enqueue("C");
  const data = buffer.array.get(2);
  if (data !== "C") {
    logError("FAILED: enqueue");
    logError("\tfailed to enqueue data into the buffer");
    logError("\tExpected: C");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: enqueue");
  return true;
}

function test_dequeue() {
  const buffer = makeBuffer();
  buffer.enqueue("A");
  buffer.enqueue("B");
  buffer.enqueue("C");
  const data = buffer.dequeue();
  if (data !== "A") {
    logError("FAILED: dequeue");
    logError("\tfailed to dequeue data from the buffer");
    logError("\tExpected: A");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: dequeue");
  return true;
}

function test_peek() {
  const buffer = makeBuffer();
  buffer.enqueue("A");
  buffer.enqueue("B");
  buffer.enqueue("C");
  const data = buffer.peek();
  if (data !== "A") {
    logError("FAILED: peek");
    logError("\tfailed to peek at the head of the buffer");
    logError("\tExpected: A");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: peek");
  return true;
}

function test_isEmpty() {
  const buffer = makeBuffer();
  if (!buffer.isEmpty()) {
    logError("FAILED: isEmpty");
    logError("\tbuffer should be empty");
    return false;
  }

  logSuccess("PASSED: isEmpty");
  return true;
}

function test_isFull() {
  const buffer = makeBuffer();
  buffer.enqueue("A");
  buffer.enqueue("B");
  buffer.enqueue("C");
  if (!buffer.isFull()) {
    logError("FAILED: isFull");
    logError("\tbuffer should be full");
    return false;
  }

  logSuccess("PASSED: isFull");
  return true;
}

function test_capacity() {
  const buffer = makeBuffer();
  const capacity = buffer.capacity();
  if (capacity !== 3) {
    logError("FAILED: capacity");
    logError("\tfailed to get buffer capacity");
    logError("\tExpected: 3");
    logError("\tFound: " + capacity);
    return false;
  }

  logSuccess("PASSED: capacity");
  return true;
}

function test_remainingCapacity() {
  const buffer = makeBuffer();
  buffer.enqueue("A");
  buffer.enqueue("B");
  const capacity = buffer.remainingCapacity();
  if (capacity !== 1) {
    logError("FAILED: remainingCapacity");
    logError("\tfailed to get remaining buffer capacity");
    logError("\tExpected: 1");
    logError("\tFound: " + capacity);
    return false;
  }

  logSuccess("PASSED: remainingCapacity");
  return true;
}

function test_get() {
  const buffer = makeBuffer();
  buffer.enqueue("A");
  buffer.enqueue("B");
  buffer.enqueue("C");
  const data = buffer.get(1);
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

function test_Iterator() {
  const buffer = makeBuffer();
  buffer.enqueue("A");
  buffer.enqueue("B");
  buffer.enqueue("C");
  const allValues = ["A", "B", "C"];
  const foundValues = [];
  for (const data of buffer) {
    foundValues.push(data);
  }

  const foundAllValues = allValues.every((value) =>
    foundValues.includes(value)
  );
  const noDuplicates =
    foundValues.length === allValues.length && foundAllValues;

  if (!foundAllValues || !noDuplicates) {
    logError("FAILED: Iterator");
    logError("\tFailed to find all values:");
    logError("\tExpected: " + allValues);
    logError("\tFound: " + foundValues);
    return false;
  }

  logSuccess("PASSED: Iterator");
  return true;
}

export const tests = [
  test_enqueue,
  test_dequeue,
  test_peek,
  test_isEmpty,
  test_isFull,
  test_capacity,
  test_remainingCapacity,
  test_get,
  test_Iterator,
];

// change to true to run test file seperately
if (false) {
  console.log("Running Circular Buffer tests...");
  runTests(tests);
}
