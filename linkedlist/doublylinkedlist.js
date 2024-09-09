export default class DoublyLinkedList {
    head = null;
    tail = null;

    constructor(...nodes) {
        this.head = nodes[0];
        for (let i = 1; i < nodes.length; i++) {
            const current = nodes[i]
            current.next = this.head;
            this.head.prev = current;
            this.head = current;
        }
    }

    addLast(data) {
        
    }

    addFirst(data) {
        const node = new Node(data);
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }

        node.next = this.head;
        node.next.prev = node;
        this.head = node;
    }

    get(index) {

    }

    indexOf(data) {
        
    }

    insertAfter(index, data) {
        
    }

    insertBefore(index, data) {

    }

    first() {
        return this.head;
    }

    last() {
        return this.tail;
    }

    remove(data) {

    }

    removeIndex(index) {

    }

    removeFirst() {

    }

    removeLast() {

    }

    //NODE SPECIFIC OPERATIONS

    addNodeLast(node) {

    }

    addNodeFirst(node) {

    }

    insertAfterNode(newNode, existingNode) {

    }

    insertBeforeNode(newNode, existingNode) {

    }

    removeNode(node) {

    }

    nodeAt(index) {

    }

    swapNodes(nodeA, nodeB) {

    }

    // Helpers

    clear() {
        
    }

    size() {
        
    }

    dumpList() {
        let node = this.head;
        let output = node.data;
        while (!!node) {
            if (node !== this.head) {   
                output += " <-> " + node.data;
            }
            node = node.next
        }
        console.log(output);
        
    }

}

class Node {
    prev = null;
    next = null;
    data;

    constructor(data) {
        this.data = data;
    }
}