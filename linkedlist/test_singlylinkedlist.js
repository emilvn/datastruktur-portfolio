import SinglyLinkedList from "./singlylinkedlist.js";

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

let list = new SinglyLinkedList(a, b, c);

// Test add
console.log("Test add");
resetNodes();
list = new SinglyLinkedList(a, b, c);
list.dumpList();
list.add("D")
list.dumpList();
console.log("---------------------------");

// Test Remove
console.log("Test remove");
resetNodes();
list = new SinglyLinkedList(a, b, c);
list.dumpList();
list.remove("C");
list.dumpList();
console.log("---------------------------");

// Test getFirst
console.log("Test getFirst");
resetNodes();
list = new SinglyLinkedList(a, b, c);
console.log(list.getFirst()) // Should be 'A'
console.log("---------------------------");

// Test getLast
console.log("Test getLast");
resetNodes();
list = new SinglyLinkedList(a, b, c);
console.log(list.getLast()) // Should be 'C'
console.log("---------------------------");

// Test getFirstNode
console.log("Test getFirstNode");
resetNodes();
list = new SinglyLinkedList(a, b, c);
console.log(list.getFirstNode()) // Should be A node
console.log("---------------------------");

// Test getNextNode
console.log("Test getNextNode");
resetNodes();
list = new SinglyLinkedList(a, b, c);
console.log(list.getNextNode(a)) // Should be B node
console.log("---------------------------");

// Test getLastNode
console.log("Test getLastNode");
resetNodes();
list = new SinglyLinkedList(a, b, c);
console.log(list.getLastNode()) // Should be C node
console.log("---------------------------");

// Test getNodeWith
console.log("Test getNodeWith");
resetNodes();
list = new SinglyLinkedList(a, b, c);
console.log(list.getNodeWith("A")); //  should be A node
console.log("---------------------------");

// Test removeFirstNode
console.log("Test removeFirstNode");
resetNodes();
list = new SinglyLinkedList(a, b, c);
list.dumpList();
list.removeFirstNode();
list.dumpList();
console.log("---------------------------");

// Test removeLastNode
console.log("Test removeLastNode");
resetNodes();
list = new SinglyLinkedList(a, b, c);
list.dumpList();
list.removeLastNode(b);
list.dumpList();
console.log("---------------------------");

// Test removeNode
console.log("Test removeNode");
resetNodes();
list = new SinglyLinkedList(a, b, c);
list.dumpList();
list.removeNode(b);
list.dumpList();
console.log("---------------------------");

// Test clear
console.log("Test clear");
resetNodes();
list = new SinglyLinkedList(a, b, c);
list.dumpList();
list.clear();
list.dumpList();
console.log("---------------------------");

// Test size
console.log("Test size");
resetNodes();
list = new SinglyLinkedList(a, b, c);
console.log(list.size()) // should be 3
console.log("---------------------------");
