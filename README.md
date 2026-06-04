# DSA Practice

Data structures and algorithms practice in TypeScript, organized by topic.

Uses Node.js's built-in TypeScript support (type stripping) and built-in test
runner — no vitest, no ts-node, no build step.

## Requirements

Node.js 22.6+ (Node 24+ for stable, unflagged type stripping). Verified on Node 26.

## Setup

```bash
npm install
```

## Commands

```bash
npm test              # run all *.test.ts files via node --test
npm run test:watch    # watch mode
npm run typecheck     # tsc --noEmit (Node strips types but doesn't check them)
```

Run a single file directly:

```bash
node --test src/arrays/two-sum.test.ts
node src/arrays/two-sum.ts
```

## Layout

Each topic lives in `src/<topic>/`. Co-locate tests as `problem-name.test.ts`.

```
src/
  arrays/  strings/  linked-lists/  stacks/  queues/  hashing/
  trees/  graphs/  heaps/  tries/
  sorting/  searching/
  dynamic-programming/  greedy/  backtracking/  recursion/
  two-pointers/  sliding-window/
  bit-manipulation/  math/
```

## Conventions

- One problem per file. Name files after the problem (e.g. `two-sum.ts`).
- Export the solution as a named export so tests can import it.
- Tests use `node:test` and `node:assert/strict`.
- Add a one-line comment at the top with the source/link and difficulty.

### Example test file

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { twoSum } from "./two-sum.ts";

test("twoSum returns indices of the two numbers that sum to target", () => {
  assert.deepEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
});
```
