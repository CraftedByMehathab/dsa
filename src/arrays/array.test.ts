import { test, expect } from "vitest";
import { DynamicArray } from "./array.ts";

test("constructs with the given initial capacity", () => {
  const arr = new DynamicArray<number>(4);
  expect(arr).toBeTruthy();
});
test("constructs with less than 1 capacity throws range error", () => {
  expect(() => new DynamicArray<number>(0)).toThrow(RangeError);
});

test("push appends elements", () => {
  const arr = new DynamicArray<number>(4);
  arr.push(1);
  expect(arr.length).toBe(1);
});

test("get reads an element by index", () => {
  const arr = new DynamicArray<number>(4);
  arr.push(1);
  expect(arr.get(0)).toBe(1);
});

test("removeAt shifts later elements left", () => {
  const arr = new DynamicArray<number>(4);
  arr.push(0);
  arr.push(1);
  arr.push(2);
  arr.push(3);
  arr.push(4);
  expect(arr.removeAt(0)).toBe(0);
  expect(arr.get(0)).toEqual(1);
  expect(arr.get(4)).toBeUndefined();
});

test("finds index of first matching item", () => {
  const arr = new DynamicArray<number>(4);

  arr.push(0);
  expect(arr.indexOf(0)).toBe(0);
  arr.push(1);
  expect(arr.indexOf(1)).toBe(1);
  arr.push(2);
  expect(arr.indexOf(2)).toBe(2);
  arr.push(3);
  expect(arr.indexOf(3)).toBe(3);
  arr.push(3);
  expect(arr.indexOf(3)).toBe(3);
  expect(arr.indexOf(444444)).toBe(-1);
});
test("retuns -1 for index of unmatched item", () => {
  const arr = new DynamicArray<number>(4);

  expect(arr.indexOf(444444)).toBe(-1);
});
