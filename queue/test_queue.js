import { Queue } from "./queue.js";

class Node {
  next = null;
  data;

  constructor(data) {
    this.data = data;
  }
}

let a = new Node("A");
let b = new Node("B");
let c = new Node("C");
let d = new Node("D");

function resetNodes() {
  a = new Node("A");
  b = new Node("B");
  c = new Node("C");
  d = new Node("D");
}

let queue = new Queue(a, b, c);

// Test enqueue
console.log("Test enqueue");
resetNodes();
queue = new Queue(a, b, c);
queue.dump();
queue.enqueue("D");
queue.dump();
console.log("---------------------------");

// Test dequeue
console.log("Test dequeue");
resetNodes();
queue = new Queue(a, b, c);
queue.dump();
let data = queue.dequeue();
queue.dump();
console.log("Dequeued: ", data); // Should be a
console.log("---------------------------");

// Test size
console.log("Test size");
resetNodes();
queue = new Queue(a, b, c);
console.log(queue.size()); // should be 3
console.log("---------------------------");

// Test getHead
console.log("Test getHead");
resetNodes();
queue = new Queue(a, b, c);
queue.dump();
console.log("Head: ", queue.getHead());
console.log("---------------------------");
