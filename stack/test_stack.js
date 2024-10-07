import Stack from "./stack.js";

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

let stack = new Stack(a, b, c);

// Test iterator
console.log("Test iterator");
resetNodes();
stack = new Stack(a, b, c);
stack.dump();
for (const d of stack) {
  console.log(d);
}
console.log("---------------------------");

// Test get(index)
console.log("Test get");
resetNodes();
stack = new Stack(a, b, c);
stack.dump();
console.log(stack.get(1)); // Should be 'B'
console.log("---------------------------");

// Test add(data)
console.log("Test add");
resetNodes();
stack = new Stack(a, b, c);
stack.dump();
stack.add("D");
stack.dump();
console.log("---------------------------");

// Test getTop
console.log("Test getTop");
resetNodes();
stack = new Stack(a, b, c);
stack.dump();
console.log(stack.getTop()); // Should be 'C'
console.log("---------------------------");

// Test removeTop
console.log("Test removeTop");
resetNodes();
stack = new Stack(a, b, c);
stack.dump();
console.log(stack.removeTop()); // Should be 'C'
stack.dump();
console.log("---------------------------");

// Test addNode
console.log("Test addNode");
resetNodes();
stack = new Stack(a, b, c);
stack.dump();
stack.addNode(d);
stack.dump();
console.log("---------------------------");

// Test getTopNode
console.log("Test getTopNode");
resetNodes();
stack = new Stack(a, b, c);
stack.dump();
console.log(stack.getTopNode()); // Should be C node
console.log("---------------------------");

// Test removeTopNode
console.log("Test removeTopNode");
resetNodes();
stack = new Stack(a, b, c);
stack.dump();
console.log(stack.removeTopNode()); // Should be C node
stack.dump();
console.log("---------------------------");

// Test size
console.log("Test size");
resetNodes();
stack = new Stack(a, b, c);
console.log(stack.size()); // Should be 3
console.log("---------------------------");
