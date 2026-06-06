export class LinkedNode<T> {
  next: LinkedNode<T> | null = null;
  #value: T;
  constructor(value: T, next: LinkedNode<T> | null = null) {
    this.#value = value;
    this.next = next;
  }

  get value(): T {
    return this.#value;
  }
}
