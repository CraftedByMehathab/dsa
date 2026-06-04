# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A TypeScript data-structures-and-algorithms practice repo, organized by topic under `src/<topic>/`. Topic dirs currently hold only `.gitkeep` — solutions are added over time, one problem per file.

## Key constraint: no build step

This repo runs `.ts` files directly via Node.js's native type stripping (Node 22.6+, ideally 24+). There is **no bundler, no ts-node, no compile output**. This drives several non-obvious rules:

- `tsconfig.json` is `noEmit` and exists only for `npm run typecheck`. Node strips types but does **not** type-check, so `tsc --noEmit` is the only thing that catches type errors.
- Relative imports **must** include the `.ts` extension (e.g. `import { twoSum } from "./two-sum.ts"`). This is enforced by `allowImportingTsExtensions` + `rewriteRelativeImportExtensions`.
- `isolatedModules` is on — no `const enum`, and type-only re-exports need `export type`.

## Commands

```bash
npm test                              # all *.test.ts under src/ and tests/ via node --test
npm run test:watch                    # watch mode
npm run typecheck                     # tsc --noEmit — the only type checker
node --test src/arrays/two-sum.test.ts   # run a single test file
node src/arrays/two-sum.ts               # run a single solution file directly
```

## Conventions

- One problem per file, named after the problem (e.g. `two-sum.ts`); co-locate its test as `two-sum.test.ts`.
- Export the solution as a **named export** so the test can import it.
- Tests use `node:test` (`test`) and `node:assert/strict` (`assert`) — no third-party test framework.
- Top of each solution file: a one-line comment with the source/link and difficulty.
