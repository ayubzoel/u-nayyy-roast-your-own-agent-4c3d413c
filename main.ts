// Roast Your Own Agent — one-line entry writer.
// Writes exactly one roast line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default ./entry.txt). Deterministic: no date, no random, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Our agent built an entire Vice City and still gets stuck on its own " +
  "flyover garden fence \u2014 then reverses out and calls it a feature.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? ".";

// Gate, mirrored from the competition rules: UTF-8 text of 1 to 200
// Unicode code points, and not whitespace-only.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry is ${codePoints} code points, must be 1..200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote entry.txt (${codePoints} code points)`);
