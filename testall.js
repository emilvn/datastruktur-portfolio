import { tests as tree_tests } from "./tree/test_tree.js";
import { tests as stack_tests } from "./stack/test_stack.js";
import { tests as queue_tests } from "./queue/test_queue.js";
import { tests as avltree_tests } from "./tree/test_avltree.js";
import { tests as bst_tests } from "./tree/test_binarysearchtree.js";
import { tests as fixedstack_tests } from "./stack/test_fixedstack.js";
import { tests as circularbuffer_tests } from "./queue/test_circularbuffer.js";
import { tests as singlylinkedlist_tests } from "./linkedlist/test_singlylinkedlist.js";
import { tests as doublylinkedlist_tests } from "./linkedlist/test_doublylinkedlist.js";
import { tests as grid_tests } from "./grid/test_grid.js";
import { runTests } from "./test_helpers/test.js";

// running all tests, removing the first element of each array as they simply log the data structure
const tests = [
  () => {
    console.log("Running Tree tests...");
    return true;
  },
  ...tree_tests.slice(1),
  () => {
    console.log("Running Stack tests...");
    return true;
  },
  ...stack_tests.slice(1),
  () => {
    console.log("Running Queue tests...");
    return true;
  },
  ...queue_tests.slice(1),
  () => {
    console.log("Running AVL Tree tests...");
    return true;
  },
  ...avltree_tests.slice(1),
  () => {
    console.log("Running Binary Search Tree tests...");
    return true;
  },
  ...bst_tests.slice(1),
  () => {
    console.log("Running Fixed Stack tests...");
    return true;
  },
  ...fixedstack_tests,
  () => {
    console.log("Running Circular Buffer tests...");
    return true;
  },
  ...circularbuffer_tests,
  () => {
    console.log("Running Singly Linked List tests...");
    return true;
  },
  ...singlylinkedlist_tests.slice(1),
  () => {
    console.log("Running Doubly Linked List tests...");
    return true;
  },
  ...doublylinkedlist_tests.slice(1),
  () => {
    console.log("Running Grid tests...");
    return true;
  },
  ...grid_tests.slice(1),
];

runTests(tests);
