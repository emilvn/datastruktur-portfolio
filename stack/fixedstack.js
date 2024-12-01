import StaticArray from "../array/staticarray.js";

export default class FixedStack {
  stackpointer = 0;
  array;

  constructor(size) {
    this.array = new StaticArray(size);
  }

  push(data) {
    this.array.set(this.stackpointer++, data);
  }

  pop() {
    const data = this.array.get(--this.stackpointer);
    this.array.set(this.stackpointer, undefined);
    return data;
  }

  peek() {
    return this.array.get(
      this.stackpointer - 1 > 0 ? this.stackpointer - 1 : 0
    );
  }

  size() {
    return this.stackpointer;
  }

  get(index) {
    return this.array.get(index);
  }
}
