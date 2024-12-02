import { logError, logSuccess } from "../test_helpers/log.js";
import { runTests } from "../test_helpers/test.js";
import SinglyLinkedList, { Node } from "./singlylinkedlist.js";

function makeList() {
  const a = new Node("A");
  const b = new Node("B");
  const c = new Node("C");

  const list = new SinglyLinkedList(a, b, c);
  return list;
}

function test_add() {
  const list = makeList();
  list.add("D");
  const data = list.getNodeWith("D");
  if (!data) {
    logError("FAILED: add");
    logError("\tfailed to add data to last index");
    logError("\tExpected: D");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: add");
  return true;
}

function test_remove() {
  const list = makeList();
  list.remove("C");
  const data = list.getNodeWith("C");
  if (data) {
    logError("FAILED: remove");
    logError("\tfailed to remove data");
    logError("\tExpected: B");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: remove");
  return true;
}

function test_getFirst() {
  const list = makeList();
  const data = list.getFirst();
  if (data !== "A") {
    logError("FAILED: getFirst");
    logError("\tfailed to get first data");
    logError("\tExpected: A");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: getFirst");
  return true;
}

function test_getLast() {
  const list = makeList();
  const data = list.getLast();
  if (data !== "C") {
    logError("FAILED: getLast");
    logError("\tfailed to get last data");
    logError("\tExpected: C");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: getLast");
  return true;
}

function test_getFirstNode() {
  const list = makeList();
  const data = list.getFirstNode();
  if (data.data !== "A") {
    logError("FAILED: getFirstNode");
    logError("\tfailed to get first node");
    logError("\tExpected: A");
    logError("\tFound: " + data.data);
    return false;
  }

  logSuccess("PASSED: getFirstNode");
  return true;
}

function test_getNextNode() {
  const list = makeList();
  const data = list.getNextNode(list.getFirstNode());
  if (data.data !== "B") {
    logError("FAILED: getNextNode");
    logError("\tfailed to get next node");
    logError("\tExpected: B");
    logError("\tFound: " + data.data);
    return false;
  }

  logSuccess("PASSED: getNextNode");
  return true;
}

function test_getLastNode() {
  const list = makeList();
  const data = list.getLastNode();
  if (data.data !== "C") {
    logError("FAILED: getLastNode");
    logError("\tfailed to get last node");
    logError("\tExpected: C");
    logError("\tFound: " + data.data);
    return false;
  }

  logSuccess("PASSED: getLastNode");
  return true;
}

function test_getNodeWith() {
  const list = makeList();
  const data = list.getNodeWith("B");
  if (data.data !== "B") {
    logError("FAILED: getNodeWith");
    logError("\tfailed to get node with data");
    logError("\tExpected: B");
    logError("\tFound: " + data.data);
    return false;
  }

  logSuccess("PASSED: getNodeWith");
  return true;
}

function test_removeFirstNode() {
  const list = makeList();
  list.removeFirstNode();
  const data = list.getFirst();
  if (data !== "B") {
    logError("FAILED: removeFirstNode");
    logError("\tfailed to remove first node");
    logError("\tExpected: B");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: removeFirstNode");
  return true;
}

function test_removeLastNode() {
  const list = makeList();
  list.removeLastNode();
  const data = list.getLast();
  if (data !== "B") {
    logError("FAILED: removeLastNode");
    logError("\tfailed to remove last node");
    logError("\tExpected: B");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: removeLastNode");
  return true;
}

function test_removeNode() {
  const list = makeList();
  list.removeNode(list.getNodeWith("B"));
  const data = list.getNodeWith("B");
  if (data) {
    logError("FAILED: removeNode");
    logError("\tfailed to remove node");
    logError("\tExpected: C");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: removeNode");
  return true;
}

function test_clear() {
  const list = makeList();
  list.clear();
  const size = list.size();
  if (size !== 0) {
    logError("FAILED: clear");
    logError("\tfailed to clear list");
    logError("\tExpected: 0");
    logError("\tFound: " + size);
    return false;
  }

  logSuccess("PASSED: clear");
  return true;
}

function test_size() {
  const list = makeList();
  const size = list.size();
  if (size !== 3) {
    logError("FAILED: size");
    logError("\tfailed to get size");
    logError("\tExpected: 3");
    logError("\tFound: " + size);
    return false;
  }

  logSuccess("PASSED: size");
  return true;
}

function test_dumpList() {
  const list = makeList();
  list.dumpList();
  return true;
}

export const tests = [
  test_dumpList,
  test_size,
  test_clear,
  test_removeNode,
  test_removeLastNode,
  test_removeFirstNode,
  test_getNodeWith,
  test_getLastNode,
  test_getNextNode,
  test_getFirstNode,
  test_getLast,
  test_getFirst,
  test_remove,
  test_add,
];

if (import.meta.main) {
  console.log("Running SinglyLinkedList tests...");
  runTests(tests);
}
