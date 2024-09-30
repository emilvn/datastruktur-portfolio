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

// Test peek
console.log("Test peek");
resetNodes();
queue = new Queue(a, b, c);
queue.dump();
console.log("Head: ", queue.peek());
console.log("---------------------------");

// Test Iterator
console.log("Test Iterator");
resetNodes();
queue = new Queue(a, b, c);
queue.dump();
for (const d of queue) {
  console.log(d);
}
console.log("---------------------------");

// Test clear
console.log("Test clear");
resetNodes();
queue = new Queue(a, b, c);
queue.dump();
queue.clear();
queue.dump();
console.log("---------------------------");

// Test get
console.log("Test get");
resetNodes();
queue = new Queue(a, b, c);
queue.dump();
console.log(queue.get(1)); // Should be 'B'
console.log("---------------------------");
