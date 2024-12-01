import StaticArray from "../array/staticarray.js";

export default class CircularBuffer {
  array;
  arraySize;
  head = 0;
  tail = 0;
  length = 0;
  constructor(size) {
    this.arraySize = size;
    this.array = new StaticArray(size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  [Symbol.iterator]() {
    let index = this.head;
    let count = 0;
    return {
      next: () => {
        if (count < this.length) {
          const data = this.array.get(index);
          index = (index + 1) % this.arraySize;
          count++;
          return { value: data, done: false };
        } else {
          return { done: true };
        }
      },
    };
  }

  enqueue(data) {
    if (this.isFull()) {
      throw new Error("Buffer is full");
    }

    this.array.set(this.tail, data);
    this.tail = (this.tail + 1) % this.arraySize; // keep tail index within bounds
    this.length++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return;
    }

    const data = this.array.get(this.head);
    this.head = (this.head + 1) % this.arraySize; // keep head index within bounds
    this.length--;
    return data;
  }

  peek() {
    return this.array.get(this.head);
  }

  size() {
    return this.length;
  }

  get(index) {
    return this.array.get(index);
  }

  isEmpty() {
    return this.length === 0;
  }

  isFull() {
    return this.length === this.arraySize;
  }

  capacity() {
    return this.arraySize;
  }

  remainingCapacity() {
    return this.arraySize - this.length;
  }
}
