// main.ts -- entrypoint for the gta6-meme-x-01 make.fun entry.
//
// The whole entry is a single fact: the address of one public post
// on X. That address is kept in POST.json at the repository root.
// When the harness runs this file it points MAKEFUN_BOT_DIR at the
// directory holding the entry and MAKEFUN_OUTPUT_DIR at the place
// the answer must land; the job here is to check POST.json is sound
// and then carry it, byte for byte, into the output directory.
//
// Runtime: Node 22 (this file's name is what selects it). Standard
// library only, no network, no clock, nothing read from outside the
// bot directory -- the same input always yields the same bytes.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MANIFEST_NAME = "POST.json";
const FALLBACK_OUTPUT_DIR = "out";

// Every failure leaves through this one door: a single clear line
// on stderr and a non-zero exit, so a broken entry can never be
// mistaken for a good one.
function fail(reason: string): never {
  console.error(`gta6-meme-x-01: ${reason}`);
  process.exit(1);
}

// Read the manifest out of the bot directory and check it really is
// the shape the house expects: a JSON object whose "url" field is a
// string holding one valid https address. Returns the file's raw
// bytes (so the copy stays exact) together with the address found.
function loadManifest(botDir: string): { raw: Buffer; url: string } {
  const manifestPath = join(botDir, MANIFEST_NAME);
  if (!existsSync(manifestPath)) {
    fail(`no ${MANIFEST_NAME} found in bot directory "${botDir}"`);
  }
  const raw = readFileSync(manifestPath);

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw.toString("utf8"));
  } catch {
    fail(`${MANIFEST_NAME} is not valid JSON`);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    fail(`${MANIFEST_NAME} must hold a single JSON object`);
  }

  const url = (parsed as Record<string, unknown>).url;
  if (typeof url !== "string" || url.length === 0) {
    fail(`${MANIFEST_NAME} has no "url" string`);
  }
  let address: URL;
  try {
    address = new URL(url);
  } catch {
    fail(`"url" is not a valid address: ${url}`);
  }
  if (address.protocol !== "https:") {
    fail(`"url" must use https, not ${address.protocol}`);
  }
  // The manifest exists to name one post on X, so hold it to that:
  // the host must be x.com (or twitter.com) and the path must be a
  // post's path, with "/status/" in it. Anything else is a mistake
  // worth failing loudly here rather than at the gate.
  const host = address.hostname.toLowerCase();
  const onX = host === "x.com" || host.endsWith(".x.com") ||
    host === "twitter.com" || host.endsWith(".twitter.com");
  if (!onX || !address.pathname.includes("/status/")) {
    fail(`"url" must be the address of a post on X: ${url}`);
  }
  return { raw, url };
}

// Validate the manifest, then write its untouched bytes into the
// output directory, creating that directory (and any parents) when
// it is not already there. Returns the published address.
function publish(botDir: string, outputDir: string): string {
  const { raw, url } = loadManifest(botDir);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, MANIFEST_NAME), raw);
  return url;
}

function main(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? FALLBACK_OUTPUT_DIR;
  const url = publish(botDir, outputDir);
  console.log(`gta6-meme-x-01: published ${url}`);
}

main();
