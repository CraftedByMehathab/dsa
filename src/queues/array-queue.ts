export class ArrayQueue<T> {
  #capacity = 0;
  #length = 0;
  #arrayQueue: (T | null)[];
  #start = 0;
  #last = 0;

  constructor(capacity = 10) {
    if (capacity < 1) throw new Error("Capacity should be at least 1");
    this.#capacity = capacity;
    this.#arrayQueue = new Array<T | null>(capacity).fill(null);
  }

  enqueue(item: T) {
    if (this.isFull()) throw new Error("Queue overflow");
    this.#arrayQueue[this.#getCircularIndex(this.#last)] = item;
    this.#length++;
    this.#last++;
  }

  dequeue(): T {
    if (this.isEmpty()) throw new Error("Queue is empty");
    const circularIdxStart = this.#getCircularIndex(this.#start);
    const item = this.#arrayQueue[circularIdxStart]!;
    this.#arrayQueue[circularIdxStart] = null;
    this.#length--;
    this.#start++;
    return item;
  }

  peek() {
    return this.#arrayQueue[this.#getCircularIndex(this.#start)];
  }

  isFull() {
    return this.#length === this.#capacity;
  }

  isEmpty() {
    return this.#length === 0;
  }

  print() {
    console.log(this.#arrayQueue);
  }

  #getCircularIndex(idx: number): number {
    return idx % this.#capacity;
  }
}
