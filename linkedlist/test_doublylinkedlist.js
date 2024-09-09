import DoublyLinkedList from "./doublylinkedlist.js";

class Node {
    prev = null;
    next = null;
    data;

    constructor(data) {
        this.data = data;
    }
}



const a = new Node("A");
const b = new Node("B");
const c = new Node("C");

const list = new DoublyLinkedList(a, b, c);

// // Test dumplist
// list.dumpList();

// // Test addFirst
// list.dumpList();
// list.addFirst("D")
// list.dumpList();

// // Test addLast
// list.dumpList();
// list.addLast("D")
// list.dumpList();

// // Test get
// console.log(list.get(0)?.data) // should be 'C'
// console.log(list.get(1)?.data) // should be 'B'
// console.log(list.get(2)?.data) // should be 'A'
// console.log(list.get(3)?.data) // should be undefined (node is null)

// Test indexOf
console.log(list.indexOf("A")); // should be 2
console.log(list.indexOf("B")); // should be 1
console.log(list.indexOf("C")); // should be 0
console.log(list.indexOf("D")); // should be -1
