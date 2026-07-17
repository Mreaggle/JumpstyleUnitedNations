import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");
const mapping = readJson("data/global-event-countries.json");
const registry = readJson("data/country-research.json");
const source = read(mapping.source);
const sourceHash = crypto.createHash("sha256").update(source).digest("hex");

if (sourceHash !== mapping.sourceSha256) {
  fail(
    "Global Timeline changed. Review country assignments and update sourceSha256 before synchronizing.",
  );
}

const parsed = parseGlobalTimeline(source);
if (parsed.events.length !== mapping.expectedEventCount) {
  fail(
    `Expected ${mapping.expectedEventCount} global events, found ${parsed.events.length}.`,
  );
}

for (const event of parsed.events) {
  if (!Object.hasOwn(mapping.events, event.id))
    fail(`Missing country assignment for global event ${event.id}.`);
}

const knownCodes = new Set(registry.countries.map((country) => country.code));
for (const [eventId, codes] of Object.entries(mapping.events)) {
  if (!parsed.events.some((event) => event.id === eventId))
    fail(`Country assignment references unknown event ${eventId}.`);
  for (const code of codes) {
    if (!knownCodes.has(code))
      fail(`Global event ${eventId} references unknown country ${code}.`);
  }
}

const byCountry = new Map(
  registry.countries.map((country) => [country.code, []]),
);
for (const code of mapping.introCountries)
  byCountry.get(code)?.push(parsed.intro);
for (const event of parsed.events) {
  for (const code of mapping.events[event.id]) byCountry.get(code).push(event);
}

const stale = [];
for (const country of registry.countries) {
  if (!country.timeline) continue;
  const current = fs.existsSync(resolve(country.timeline))
    ? read(country.timeline)
    : `# Jumpstyle Timeline\n\n## ${country.name}\n`;
  const next = replaceSyncBlock(
    current,
    renderCountryBlock(country, byCountry.get(country.code)),
  );
  if (next === current) continue;
  if (checkOnly) stale.push(country.timeline);
  else {
    fs.mkdirSync(path.dirname(resolve(country.timeline)), { recursive: true });
    fs.writeFileSync(resolve(country.timeline), next);
  }
}

if (stale.length) fail(`National timeline sync is stale:\n${stale.join("\n")}`);
console.log(
  `${checkOnly ? "check" : "sync"}: national timelines ok - ${parsed.events.length} global events mapped across ${registry.countries.length} countries`,
);

function parseGlobalTimeline(markdown) {
  const lines = markdown.split(/\r?\n/);
  const events = [];
  let era = "Global context";
  let year = "";
  let month = "Context";
  let intro = null;

  for (const line of lines) {
    if (/^### (?!#)/.test(line)) era = line.replace(/^### /, "").trim();
    const yearMatch = line.match(/^#### (\d{4})/);
    if (yearMatch) {
      year = yearMatch[1];
      month = "Context";
      continue;
    }
    const monthMatch = line.match(/^\s*-\s+\*\*([^*]+)\*\*:\s*$/);
    if (monthMatch) {
      month = monthMatch[1].trim();
      continue;
    }
    if (!intro && year === "1991" && /^>/.test(line)) {
      intro = {
        id: "000",
        era,
        year,
        month: "Context",
        markdown: line.replace(/^>\s?/, ""),
      };
      continue;
    }
    if (/^\s{2}-\s+/.test(line)) {
      events.push({
        id: String(events.length + 1).padStart(3, "0"),
        era,
        year,
        month,
        markdown: line.replace(/^\s{2}-\s+/, ""),
      });
    }
  }

  if (!intro) fail("Global Timeline introduction was not found.");
  return { intro, events };
}

function renderCountryBlock(country, events) {
  const lines = [
    "<!-- JUN:GLOBAL-SYNC:START -->",
    "## Synchronized records from the Global Timeline",
    "",
    "> Generated from [`Global/global-timeline.md`](../Global/global-timeline.md).",
    "> Edit the global source and `data/global-event-countries.json`, then run",
    "> `npm run sync:national`. Do not edit this block manually.",
    "",
  ];

  if (!events.length) {
    lines.push(
      `_No Global Timeline event is currently attributed specifically to ${country.name}._`,
      "",
    );
  } else {
    let currentEra = "";
    let currentYear = "";
    for (const event of events) {
      if (event.era !== currentEra) {
        if (lines.at(-1) !== "") lines.push("");
        lines.push(`### ${event.era}`, "");
        currentEra = event.era;
        currentYear = "";
      }
      if (event.year !== currentYear) {
        if (lines.at(-1) !== "") lines.push("");
        lines.push(`#### ${event.year}`, "");
        currentYear = event.year;
      }
      lines.push(
        `- **${event.month}**: ${event.markdown} <!-- global-event:${event.id} -->`,
      );
    }
    lines.push("");
  }

  lines.push("<!-- JUN:GLOBAL-SYNC:END -->");
  return lines.join("\n");
}

function replaceSyncBlock(markdown, block) {
  const pattern =
    /\n?<!-- JUN:GLOBAL-SYNC:START -->[\s\S]*?<!-- JUN:GLOBAL-SYNC:END -->\n?/;
  const base = markdown.replace(pattern, "\n").trimEnd();
  return `${base}\n\n${block}\n`;
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

function read(file) {
  return fs.readFileSync(resolve(file), "utf8");
}

function readJson(file) {
  return JSON.parse(read(file));
}

function resolve(file) {
  return path.join(root, file);
}
