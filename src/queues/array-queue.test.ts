import { test, expect } from "vitest";
import { ArrayQueue } from "./array-queue.ts";

test("constructs an empty queue", () => {
  const queue = new ArrayQueue<number>();
  expect(queue.isEmpty()).toBe(true);
  expect(queue.isFull()).toBe(false);
});

test("constructs with capacity less than 1 throws", () => {
  expect(() => new ArrayQueue<number>(0)).toThrow();
  expect(() => new ArrayQueue<number>(-1)).toThrow();
});

test("enqueue then dequeue returns items in FIFO order", () => {
  const queue = new ArrayQueue<number>(3);
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  expect(queue.dequeue()).toBe(1);
  expect(queue.dequeue()).toBe(2);
  expect(queue.dequeue()).toBe(3);
});

test("peek returns the front item without removing it", () => {
  const queue = new ArrayQueue<number>(3);
  queue.enqueue(10);
  queue.enqueue(20);
  expect(queue.peek()).toBe(10);
  expect(queue.peek()).toBe(10);
  expect(queue.isEmpty()).toBe(false);
});

test("isFull is true once capacity is reached", () => {
  const queue = new ArrayQueue<number>(2);
  expect(queue.isFull()).toBe(false);
  queue.enqueue(1);
  expect(queue.isFull()).toBe(false);
  queue.enqueue(2);
  expect(queue.isFull()).toBe(true);
});

test("enqueue on a full queue throws overflow", () => {
  const queue = new ArrayQueue<number>(1);
  queue.enqueue(1);
  expect(() => queue.enqueue(2)).toThrow("Queue overflow");
});

test("dequeue on an empty queue throws", () => {
  const queue = new ArrayQueue<number>(2);
  expect(() => queue.dequeue()).toThrow("Queue is empty");
});

test("isEmpty reflects state after enqueue and dequeue", () => {
  const queue = new ArrayQueue<number>(2);
  expect(queue.isEmpty()).toBe(true);
  queue.enqueue(1);
  expect(queue.isEmpty()).toBe(false);
  queue.dequeue();
  expect(queue.isEmpty()).toBe(true);
});

test("wraps around the circular buffer reusing freed slots", () => {
  const queue = new ArrayQueue<number>(3);
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  expect(queue.dequeue()).toBe(1);
  expect(queue.dequeue()).toBe(2);
  // two slots freed — enqueue should reuse them without overflow
  queue.enqueue(4);
  queue.enqueue(5);
  expect(queue.isFull()).toBe(true);
  expect(queue.dequeue()).toBe(3);
  expect(queue.dequeue()).toBe(4);
  expect(queue.dequeue()).toBe(5);
  expect(queue.isEmpty()).toBe(true);
});

test("preserves FIFO order across many wrap-arounds", () => {
  const queue = new ArrayQueue<number>(3);
  const out: number[] = [];
  for (let i = 0; i < 10; i++) {
    queue.enqueue(i);
    out.push(queue.dequeue());
  }
  expect(out).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("works with non-number element types", () => {
  const queue = new ArrayQueue<string>(2);
  queue.enqueue("a");
  queue.enqueue("b");
  expect(queue.dequeue()).toBe("a");
  expect(queue.dequeue()).toBe("b");
});
