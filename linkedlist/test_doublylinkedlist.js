import { logError, logSuccess } from "../test_helpers/log.js";
import { runTests } from "../test_helpers/test.js";
import DoublyLinkedList, { Node } from "./doublylinkedlist.js";

function makeList() {
  const a = new Node("A");
  const b = new Node("B");
  const c = new Node("C");

  const list = new DoublyLinkedList(a, b, c);
  return list;
}

function test_addFirst() {
  const list = makeList();
  list.addFirst("D");
  const data = list.get(0);
  if (data !== "D") {
    logError("FAILED: addFirst");
    logError("\tfailed to add data to first index");
    logError("\tExpected: D");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: addFirst");
  return true;
}

function test_addLast() {
  const list = makeList();
  list.addLast("D");
  const data = list.get(3);
  if (data !== "D") {
    logError("FAILED: addLast");
    logError("\tfailed to add data to last index");
    logError("\tExpected: D");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: addLast");
  return true;
}

function test_get() {
  const list = makeList();
  const data = list.get(1);
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

function test_indexOf() {
  const list = makeList();
  const index = list.indexOf("B");
  if (index !== 1) {
    logError("FAILED: indexOf");
    logError("\tfailed to find index of data");
    logError("\tExpected: 1");
    logError("\tFound: " + index);
    return false;
  }

  logSuccess("PASSED: indexOf");
  return true;
}

function test_insertAfter() {
  const list = makeList();
  list.insertAfter(1, "D");
  const data = list.get(2);
  if (data !== "D") {
    logError("FAILED: insertAfter");
    logError("\tfailed to insert data after index");
    logError("\tExpected: D");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: insertAfter");
  return true;
}

function test_insertBefore() {
  const list = makeList();
  list.insertBefore(1, "D");
  const data = list.get(1);
  if (data !== "D") {
    logError("FAILED: insertBefore");
    logError("\tfailed to insert data before index");
    logError("\tExpected: D");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: insertBefore");
  return true;
}

function test_remove() {
  const list = makeList();
  list.remove("B");
  const data = list.get(1);
  if (data !== "C") {
    logError("FAILED: remove");
    logError("\tfailed to remove data");
    logError("\tExpected: C");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: remove");
  return true;
}

function test_removeIndex() {
  const list = makeList();
  list.removeIndex(1);
  const data = list.get(1);
  if (data !== "C") {
    logError("FAILED: removeIndex");
    logError("\tfailed to remove data at index");
    logError("\tExpected: C");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: removeIndex");
  return true;
}

function test_removeFirst() {
  const list = makeList();
  list.removeFirst();
  const data = list.get(0);
  if (data !== "B") {
    logError("FAILED: removeFirst");
    logError("\tfailed to remove first node");
    logError("\tExpected: B");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: removeFirst");
  return true;
}

function test_removeLast() {
  const list = makeList();
  list.removeLast();
  const data = list.get(2);
  if (data !== undefined) {
    logError("FAILED: removeLast");
    logError("\tfailed to remove last node");
    logError("\tExpected: undefined");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: removeLast");
  return true;
}

function test_addNodeFirst() {
  const list = makeList();
  const d = new Node("D");
  list.addNodeFirst(d);
  const data = list.get(0);
  if (data !== "D") {
    logError("FAILED: addNodeFirst");
    logError("\tfailed to add node to first index");
    logError("\tExpected: D");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: addNodeFirst");
  return true;
}

function test_addNodeLast() {
  const list = makeList();
  const d = new Node("D");
  list.addNodeLast(d);
  const data = list.get(3);
  if (data !== "D") {
    logError("FAILED: addNodeLast");
    logError("\tfailed to add node to last index");
    logError("\tExpected: D");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: addNodeLast");
  return true;
}

function test_insertAfterNode() {
  const list = makeList();
  const d = new Node("D");
  list.insertAfterNode(d, list.head);
  const data = list.get(1);
  if (data !== "D") {
    logError("FAILED: insertAfterNode");
    logError("\tfailed to insert node after node");
    logError("\tExpected: D");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: insertAfterNode");
  return true;
}

function test_insertBeforeNode() {
  const list = makeList();
  const d = new Node("D");
  list.insertBeforeNode(d, list.head.next);
  const data = list.get(1);
  if (data !== "D") {
    logError("FAILED: insertBeforeNode");
    logError("\tfailed to insert node before node");
    logError("\tExpected: D");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: insertBeforeNode");
  return true;
}

function test_removeNode() {
  const list = makeList();
  list.removeNode(list.head.next);
  const data = list.get(1);
  if (data !== "C") {
    logError("FAILED: removeNode");
    logError("\tfailed to remove node");
    logError("\tExpected: C");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: removeNode");
  return true;
}

function test_nodeAt() {
  const list = makeList();
  const data = list.nodeAt(1)?.data;
  if (data !== "B") {
    logError("FAILED: nodeAt");
    logError("\tfailed to get node at index");
    logError("\tExpected: B");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: nodeAt");
  return true;
}

function test_swapNodes() {
  const list = makeList();
  list.swapNodes(list.head, list.tail);
  const data = list.get(0);
  if (data !== "C") {
    logError("FAILED: swapNodes");
    logError("\tfailed to swap nodes");
    logError("\tExpected: C");
    logError("\tFound: " + data);
    return false;
  }

  logSuccess("PASSED: swapNodes");
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
    logError("\tfailed to get size of list");
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
  test_addFirst,
  test_addLast,
  test_get,
  test_indexOf,
  test_insertAfter,
  test_insertBefore,
  test_remove,
  test_removeIndex,
  test_removeFirst,
  test_removeLast,
  test_addNodeFirst,
  test_addNodeLast,
  test_insertAfterNode,
  test_insertBeforeNode,
  test_removeNode,
  test_nodeAt,
  test_swapNodes,
  test_clear,
  test_size,
];

// change to true to run test file seperately
if (false) {
  console.log("Running DoublyLinkedList tests...");
  runTests(tests);
}
