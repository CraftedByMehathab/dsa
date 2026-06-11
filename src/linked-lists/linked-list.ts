import { LinkedNode } from "./linked-node.ts";

export class LinkedList<T> {
  #first: LinkedNode<T> | null = null;
  #last: LinkedNode<T> | null = null;
  #size = 0;

  constructor() {}
  addFirst(value: T): LinkedNode<T> {
    const node = new LinkedNode(value);
    if (!(this.#first && this.#last)) return this.initialAdd(node);
    node.next = this.#first;
    this.#first = node;
    this.#size++;
    return node;
  }
  addLast(value: T): LinkedNode<T> {
    const node = new LinkedNode(value);
    if (!(this.#first && this.#last)) return this.initialAdd(node);
    this.#last.next = node;
    this.#last = node;
    this.#size++;
    return node;
  }

  deleteFirst() {
    const deleteNode = this.#first;
    if (!deleteNode) throw new Error("List is empty");
    this.#first = deleteNode.next;
    if (this.#first === null) this.#last = null;
    deleteNode.next = null;
    this.#size--;
  }

  deleteLast(): void {
    if (!this.#first) throw new Error("List is empty");

    if (this.#first === this.#last) {
      this.#first = this.#last = null;
      this.#size--;
      return;
    }

    let prev = this.#first;
    while (prev.next !== this.#last) prev = prev.next!;

    prev.next = null;
    this.#last = prev;
    this.#size--;
  }

  contains(value: T): boolean {
    return this.indexOf(value) !== undefined;
  }
  indexOf(value: T): number | undefined {
    let current = this.#first;
    let idx = 0;
    while (current) {
      if (current.value === value) return idx;
      current = current.next;
      idx++;
    }
    return undefined;
  }
  print(): void {
    console.log([...this].join(" -> "));
  }

  reverse() {
    // prev current next
    if (!this.#first) return;
    let prev = this.#first;
    let current = prev.next;
    while (current?.next) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.#last = this.#first;
    this.#last.next = null;
    this.#first = prev;
  }

  getKthFromEnd(k: number): T | undefined {
    if (k <= 0) return undefined;

    let right = this.#first;
    for (let i = 0; i < k; i++) {
      if (right === null) return undefined; // k is larger than the list
      right = right.next;
    }

    let left = this.#first;
    while (right) {
      left = left!.next;
      right = right.next;
    }
    return left?.value;
  }

  getMiddle(): T | [T, T] | undefined {
    if (!this.#first) return undefined;
    let slow: LinkedNode<T> = this.#first;
    let fast: LinkedNode<T> | null = this.#first;

    while (fast?.next?.next) {
      slow = slow.next!;
      fast = fast.next.next;
    }
    return fast === this.#last ? slow.value : [slow.value, slow.next!.value];
  }

  *[Symbol.iterator]() {
    let current = this.#first;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  private initialAdd(node: LinkedNode<T>): LinkedNode<T> {
    this.#first = node;
    this.#last = node;
    this.#size++;
    return node;
  }
}
