import DoublyLinkedList from "./doublylinkedlist.js";

class Node {
    prev = null;
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

let list = new DoublyLinkedList(a, b, c);

// Test addFirst
console.log("Test addFirst");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.addFirst("D")
list.dumpList();
console.log("---------------------------");

// Test addLast
console.log("Test addLast");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.addLast("D")
list.dumpList();
console.log("---------------------------");

// Test get
console.log("Test get");
resetNodes();
list = new DoublyLinkedList(a, b, c);
console.log(list.get(0)) // should be 'A'
console.log(list.get(1)) // should be 'B'
console.log(list.get(2)) // should be 'C'
console.log(list.get(3)) // should be undefined (node is null)
console.log("---------------------------");

// Test indexOf
console.log("Test indexOf");
resetNodes();
list = new DoublyLinkedList(a, b, c);
console.log(list.indexOf("A")); // should be 0
console.log(list.indexOf("B")); // should be 1
console.log(list.indexOf("C")); // should be 2
console.log(list.indexOf("D")); // should be -1
console.log("---------------------------");

// Test insertAfter
console.log("Test insertAfter");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.insertAfter(2, "D");
list.dumpList();
console.log("---------------------------");

// Test insertBefore
console.log("Test insertBefore");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.insertBefore(0, "D");
list.dumpList();
console.log("---------------------------");

// Test Remove
console.log("Test remove");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.remove("C");
list.dumpList();
console.log("---------------------------");

// Test Remove index
console.log("Test removeIndex");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.removeIndex(2);
list.dumpList();
console.log("---------------------------");

// Test Remove first
console.log("Test removeFirst");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.removeFirst();
list.dumpList();
console.log("---------------------------");

// Test Remove last
console.log("Test removeLast");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.removeLast();
list.dumpList();
console.log("---------------------------");

// Test addNodeFirst
console.log("Test addNodeFirst");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.addNodeFirst(d)
list.dumpList();
console.log("---------------------------");

// Test addNodeLast
console.log("Test addNodeLast");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.addNodeLast(d)
list.dumpList();
console.log("---------------------------");

// Test insertAfterNode
console.log("Test insertAfterNode");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.insertAfterNode(d, b);
list.dumpList();
console.log("---------------------------");

// Test insertBeforeNode
console.log("Test insertBeforeNode");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.insertBeforeNode(d, a);
list.dumpList();
console.log("---------------------------");

// Test removeNode
console.log("Test removeNode");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.removeNode(b);
list.dumpList();
console.log("---------------------------");

// Test nodeAt
console.log("Test nodeAt");
resetNodes();
list = new DoublyLinkedList(a, b, c);
console.log(list.nodeAt(0)?.data); // should be "A"
console.log(list.nodeAt(1)?.data); // should be "B"
console.log(list.nodeAt(2)?.data); // should be "C"
console.log(list.nodeAt(3)?.data); // should be "undefined"
console.log("---------------------------");

// Test swapNodes
console.log("Test swapNodes");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.swapNodes(a, c);
list.dumpList();
console.log("---------------------------");

// Test clear
console.log("Test clear");
resetNodes();
list = new DoublyLinkedList(a, b, c);
list.dumpList();
list.clear();
list.dumpList();
console.log("---------------------------");

// Test size
console.log("Test size");
resetNodes();
list = new DoublyLinkedList(a, b, c);
console.log(list.size()) // should be 3
console.log("---------------------------");
