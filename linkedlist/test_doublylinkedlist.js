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
list.dumpList();

list.addFirst("D")
list.dumpList();