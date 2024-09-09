export default class DoublyLinkedList {
    /**
     * First element of list
     */
    head = null;
    /**
     * Last element of list
     */
    tail = null;

    /**
     * @param  {...Node} nodes list of nodes to store in DoublyLinkedList on construction. Will be stored in the same order as args.
     */
    constructor(...nodes) {
        // Insert nodes starting with tail to match indeces in linked list to the order of the args
        if (nodes.length > 0) {   
            this.head = nodes[0];
            this.tail = nodes[0];
            for (let i = 1; i < nodes.length; i++) {
                const current = nodes[i]
                current.prev = this.tail;
                this.tail.next = current;
                this.tail = current;
            }
        }
    }

    /**
     * Creates new node with data and adds it as the last node of the list
     * @param {any} data data to be stored in node
     */
    addLast(data) {
        const node = new Node(data);
        this.addNodeLast(node);
    }

    /**
     * Creates new node with data and adds it as the first node of the list
     * @param {any} data data to be stored in node
     */
    addFirst(data) {
        const node = new Node(data);
        this.addNodeFirst(node);
    }

    /**
     * Gets data from node at index
     * @param {number} index index of node to get data from
     * @returns {any} data of node at index
     */
    get(index) {
        let node = this.nodeAt(index);
        return node?.data; // undefined if index out of bounds
    }


    /**
     * Gets index of node with data
     * @param {any} data data of node to find index of
     * @returns {number} index of node with data, or -1 if not found
     */
    indexOf(data) {
        let node = this.head;
        let i = 0;
        while (!!node) {
            if (node.data === data) {
                return i;
            }
            node = node.next;
            i++;
        }
        return -1; // not found
    }

    /**
     * Creates new node with data and inserts it after the index
     * @param {number} index index of node to insert data after
     * @param {*} data data of node to insert
     */
    insertAfter(index, data) {
        const newNode = new Node(data);
        const leftNode = this.nodeAt(index);
        if (!leftNode) return; // index out of bounds
        this.insertAfterNode(newNode, leftNode);
    }

    /**
     * Creates new node with data and inserts it before the index
     * @param {number} index index of node to insert data before
     * @param {*} data data of node to insert
     */
    insertBefore(index, data) {
        const newNode = new Node(data);
        const rightNode = this.nodeAt(index);
        if (!rightNode) return; // index out of bounds
        this.insertBeforeNode(newNode, rightNode);
    }

    /**
     * Gets data of first node/head of list
     * @returns {any | undefined} data of first node/head of list
     */
    first() {
        return this.head?.data;
    }

    /**
     * Gets data of last node/tail of list
     * @returns {any | undefined} data of last node/tail of list
     */
    last() {
        return this.tail?.data;
    }

    /**
     * Finds node by data and removes it from the list
     * @param {any} data data of node to remove 
     */
    remove(data) {
        let node = this.head;
        let found = false;
        while (!!node) {
            if (node.data === data) {
                found = true;
                break;
            }
            node = node.next;
        }
        if (found) {
            this.removeNode(node);
        }
    }

    /**
     * Removes node at index
     * @param {number} index index of node to remove 
     */
    removeIndex(index) {
        let node = this.nodeAt(index);
        if (!node) return;
        this.removeNode(node);
    }

    /**
     * Removes first node/head of list
     */
    removeFirst() {
        if (this.head === this.tail) {
            this.clear();
            return;
        }

        this.head = this.head.next;
        this.head.prev = null;
    }

    /**
     * Removes last node/tail of list
     */
    removeLast() {
        if (this.head === this.tail) {
            this.clear();
            return;
        }

        this.tail = this.tail.prev;
        this.tail.next = null;
    }

    //NODE SPECIFIC OPERATIONS

    /**
     * Adds node at the end of the list
     * @param {Node} node node to add 
     */
    addNodeLast(node) {
        if (!this.tail) {
            this.clear();
            return;
        }

        node.prev = this.tail;
        node.prev.next = node;
        this.tail = node;
    }

    /**
     * Adds node at the start of the list
     * @param {Node} node node to add 
     */
    addNodeFirst(node) {
        if (!this.head) {
            this.clear();
            return;
        }

        node.next = this.head;
        node.next.prev = node;
        this.head = node;
    }

    /**
     * Inserts new node after an existing node
     * @param {Node} newNode node to insert
     * @param {Node} existingNode node to insert new node after
     */
    insertAfterNode(newNode, existingNode) {
        newNode.next = existingNode.next
        newNode.prev = existingNode

        if (!existingNode.next) {   
            this.tail = newNode;
        } else {
            existingNode.next.prev = newNode;
        }
        existingNode.next = newNode;
    }

    /**
     * Inserts new node before an existing node
     * @param {Node} newNode node to insert
     * @param {Node} existingNode node to insert new node before
     */
    insertBeforeNode(newNode, existingNode) {
        newNode.prev = existingNode.prev
        newNode.next = existingNode

        if (!existingNode.prev) {   
            this.head = newNode;
        } else {
            existingNode.prev.next = newNode
        }
        existingNode.prev = newNode
    }

    /**
     * Removes node from list
     * @param {Node} node node to remove 
     */
    removeNode(node) {
        const prev = node.prev;
        const next = node.next;
        if (!prev) {
            this.head = next;
        } else {
            prev.next = next;
        }
        if (!next) {
            this.tail = prev;
        } else {
            next.prev = prev;
        }
    }

    /**
     * Gets node at given index
     * @param {number} index index of node to get 
     * @returns {Node | null} node at index or null if index out of bounds
     */
    nodeAt(index) {
        let node = this.head;
        for (let i = 0; i < index; i++){
            node = node?.next // undefined if index out of bounds
        }
        return node ?? null; // null if index out of bounds
    }

    /**
     * Swaps the data of 2 nodes
     * @param {Node} nodeA first node to swap
     * @param {Node} nodeB second node to swap
     */
    swapNodes(nodeA, nodeB) {
        // We only have to swap the data
        const dataHolder = nodeA.data;
        nodeA.data = nodeB.data;
        nodeB.data = dataHolder;
    }

    // Helpers

    /**
     * Clears list
     */
    clear() {
        this.head = null;
        this.tail = null;
    }

    /**
     * Gets size of list
     * @returns {number} size of list
     */
    size() {
        let node = this.head;
        let size = 0;
        while (!!node) {
            size++
            node = node.next;
        }
        return size;
    }

    /**
     * Prints list to console, primarily for debugging
     */
    dumpList() {
        let node = this.head;
        let output = node?.data;
        while (!!node) {
            if (node !== this.head) {   
                output += " <-> " + node.data;
            }
            node = node.next
        }
        console.log("Head: " + this.head?.data);
        console.log("Tail: " + this.tail?.data);
        console.log("List: " + output);
        
    }

}

/**
 * Class for DoubleLinkedList nodes
 */
class Node {
    prev = null;
    next = null;
    data;

    constructor(data) {
        this.data = data;
    }
}