/**
 * Storing a list of items sequentially in memory
 */

export class DynamicArray<T> {
  #capacity = 0;
  #length = 0;
  #items: T[];
  constructor(initialCapacity = 8) {
    if (initialCapacity <= 0)
      throw new RangeError("Initial capacity should be at least 1");
    this.#capacity = initialCapacity;
    this.#items = new Array(initialCapacity);
  }

  push(item: T) {
    if (this.#length === this.#capacity) this.grow();
    this.#items[this.#length] = item;
    this.#length++;
  }
  get(idx: number): T | undefined {
    if (idx < 0 || idx >= this.#length) return undefined;
    return this.#items[idx];
  }

  removeAt(idx: number): T | undefined {
    const item = this.get(idx);
    if (item !== undefined) {
      for (let i = idx; i < this.#length; i++) {
        this.#items[i] = this.#items[i + 1];
      }
      this.#length--;
    }
    return item;
  }

  indexOf(item: T): number {
    let idx = -1;
    for (let i = 0; i < this.length; i++) {
      if (this.#items[i] === item) {
        idx = i;
        break;
      }
    }
    return idx;
  }

  get length(): number {
    return this.#length;
  }

  private grow(): void {
    const newCapacity = this.#capacity * 2;
    const newItems = new Array(newCapacity);
    for (let i = 0; i <= this.#length; i++) {
      newItems[i] = this.#items[i];
    }
    this.#items = newItems;
    this.#capacity = newCapacity;
  }
}
