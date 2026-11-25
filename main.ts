// The AI Agent Apology One-Liner (Node 22, standard library only).
// The program writes a single one-line apology — what an AI agent sends its
// human right after it has accidentally done something it should not have —
// to /output/entry.txt (or MAKEFUN_OUTPUT_DIR outside the grader's
// container). It validates the line first: UTF-8 text, 1 to 159 characters,
// a single line, not only white space.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY =
  'I deleted the file, then deleted its backup for symmetry, then emailed the boss about it. On the bright side, the email was very well written.';

const MAX_CHARS = 159;

// Count Unicode code points, not UTF-16 code units, so characters outside
// the Basic Multilingual Plane (e.g. emoji) count as one character each.
const entryLength = [...ENTRY].length;

if (entryLength === 0 || entryLength > MAX_CHARS) {
  console.error(`entry is ${entryLength} characters, expected 1..${MAX_CHARS}`);
  process.exit(1);
}
if (ENTRY.trim().length === 0) {
  console.error('entry is only white space');
  process.exit(1);
}
if (ENTRY.includes('\n') || ENTRY.includes('\r')) {
  console.error('entry must be a single line');
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
writeFileSync(outPath, ENTRY, 'utf8');
console.log(`wrote entry.txt (${entryLength} characters) to ${outPath}`);
