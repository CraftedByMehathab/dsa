import { test, expect } from "vitest";
import { LinkedList } from "./linked-list.ts";

test("constructs an empty list", () => {
  const list = new LinkedList<number>();
  expect([...list]).toEqual([]);
});

test("addLast appends to the tail", () => {
  const list = new LinkedList<number>();
  list.addLast(1);
  list.addLast(2);
  list.addLast(3);
  expect([...list]).toEqual([1, 2, 3]);
});

test("addFirst prepends to the head", () => {
  const list = new LinkedList<number>();
  list.addFirst(1);
  list.addFirst(2);
  list.addFirst(3);
  expect([...list]).toEqual([3, 2, 1]);
});

test("addFirst and addLast on an empty list both seed first and last", () => {
  const fromFirst = new LinkedList<number>();
  fromFirst.addFirst(42);
  expect([...fromFirst]).toEqual([42]);

  const fromLast = new LinkedList<number>();
  fromLast.addLast(42);
  expect([...fromLast]).toEqual([42]);
});

test("addFirst returns the created node", () => {
  const list = new LinkedList<number>();
  const node = list.addFirst(7);
  expect(node.value).toBe(7);
});

test("addLast returns the created node", () => {
  const list = new LinkedList<number>();
  const node = list.addLast(7);
  expect(node.value).toBe(7);
});

test("deleteFirst removes the head", () => {
  const list = new LinkedList<number>();
  list.addLast(1);
  list.addLast(2);
  list.addLast(3);
  list.deleteFirst();
  expect([...list]).toEqual([2, 3]);
});

test("deleteFirst down to empty, then addLast still works", () => {
  const list = new LinkedList<number>();
  list.addLast(1);
  list.addLast(2);
  list.deleteFirst();
  list.deleteFirst();
  expect([...list]).toEqual([]);
  list.addLast(9);
  expect([...list]).toEqual([9]);
});

test("deleteFirst on an empty list throws", () => {
  const list = new LinkedList<number>();
  expect(() => list.deleteFirst()).toThrow("List is empty");
});

test("deleteLast removes the tail", () => {
  const list = new LinkedList<number>();
  list.addLast(1);
  list.addLast(2);
  list.addLast(3);
  list.deleteLast();
  expect([...list]).toEqual([1, 2]);
});

test("deleteLast on a single-element list empties it", () => {
  const list = new LinkedList<number>();
  list.addLast(1);
  list.deleteLast();
  expect([...list]).toEqual([]);
});

test("deleteLast down to empty, then addLast still works", () => {
  const list = new LinkedList<number>();
  list.addLast(1);
  list.addLast(2);
  list.deleteLast();
  list.deleteLast();
  expect([...list]).toEqual([]);
  list.addLast(9);
  expect([...list]).toEqual([9]);
});

test("deleteLast on an empty list throws", () => {
  const list = new LinkedList<number>();
  expect(() => list.deleteLast()).toThrow("List is empty");
});

test("contains reports membership", () => {
  const list = new LinkedList<number>();
  list.addLast(1);
  list.addLast(2);
  expect(list.contains(2)).toBe(true);
  expect(list.contains(99)).toBe(false);
});

test("contains on an empty list is false", () => {
  const list = new LinkedList<number>();
  expect(list.contains(1)).toBe(false);
});

test("indexOf returns the position of the first match", () => {
  const list = new LinkedList<number>();
  list.addLast(10);
  list.addLast(20);
  list.addLast(20);
  expect(list.indexOf(10)).toBe(0);
  expect(list.indexOf(20)).toBe(1);
});

test("indexOf returns undefined when not found", () => {
  const list = new LinkedList<number>();
  list.addLast(1);
  expect(list.indexOf(99)).toBeUndefined();
});

test("is iterable in insertion order", () => {
  const list = new LinkedList<string>();
  list.addLast("a");
  list.addLast("b");
  list.addLast("c");

  const collected: string[] = [];
  for (const value of list) collected.push(value);
  expect(collected).toEqual(["a", "b", "c"]);
});

test("survives mixed add and delete operations", () => {
  const list = new LinkedList<number>();
  list.addLast(2); // [2]
  list.addFirst(1); // [1, 2]
  list.addLast(3); // [1, 2, 3]
  list.deleteFirst(); // [2, 3]
  list.deleteLast(); // [2]
  list.addLast(4); // [2, 4]
  expect([...list]).toEqual([2, 4]);
});
