import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];

const requiredFiles = [
  "README.md",
  "AGENTS.md",
  "CONTRIBUTING.md",
  "LICENSE",
  "assets/jun-logo.png",
  "docs/ARCHITECTURE.md",
  "docs/COUNTRY_RESEARCH.md",
  "docs/EDITORIAL_POLICY.md",
  "docs/REPOSITORY_AUDIT.md",
  "docs/RESEARCH_STATUS.md",
  "docs/legacy/README-2025.md",
  "data/README.md",
  "data/country-research.json",
  "data/source-registry.json",
  "llms.txt",
  "JumpstyleTimeline/Global/global-timeline.md",
];

for (const file of requiredFiles) {
  if (!exists(file)) errors.push(`Required file is missing: ${file}`);
}

const countries = readJson("data/country-research.json");
const sources = readJson("data/source-registry.json");

if (countries.schemaVersion !== 1)
  errors.push("Unsupported country registry schema");
if (countries.countries.length !== 20)
  errors.push("Country registry must contain 20 JUN research countries");
if (
  new Set(countries.countries.map((country) => country.code)).size !==
  countries.countries.length
)
  errors.push("Country registry contains duplicate codes");

for (const country of countries.countries) {
  if (!country.code || !country.name || !country.status)
    errors.push(`Incomplete country record: ${country.code || "unknown"}`);
  if (country.timeline && !exists(country.timeline))
    errors.push(`Missing country timeline: ${country.timeline}`);
  if (country.timeline && country.legacyTemplate) {
    const timeline = read(country.timeline);
    if (!timeline.includes("[Event or Contribution 1](#)"))
      errors.push(`Legacy template flag is stale: ${country.timeline}`);
  }
}

if (sources.schemaVersion !== 1)
  errors.push("Unsupported source registry schema");
if (
  new Set(sources.sources.map((source) => source.id)).size !==
  sources.sources.length
)
  errors.push("Source registry contains duplicate IDs");
for (const source of sources.sources) {
  if (
    !source.id ||
    !source.type ||
    !source.status ||
    !/^https:\/\//.test(source.url)
  )
    errors.push(`Incomplete source record: ${source.id || "unknown"}`);
}

const readme = read("README.md");
if (!readme.includes('src="assets/jun-logo.png"'))
  errors.push("README does not use the current JUN logo");
if (!readme.includes("docs/RESEARCH_STATUS.md"))
  errors.push("README does not expose research maturity");
if (fs.statSync(resolve("assets/jun-logo.png")).size < 10_000)
  errors.push("JUN logo asset appears invalid");

const globalTimeline = read("JumpstyleTimeline/Global/global-timeline.md");
if (globalTimeline.includes("[Event or Contribution 1](#)"))
  errors.push("Global timeline contains legacy placeholders");

const gitignore = read(".gitignore");
if (
  !gitignore.includes("*whatsapp*.txt") ||
  !gitignore.includes("*chat-export*")
)
  errors.push("Private export patterns are not ignored");

const trackedFiles = execFileSync("git", ["ls-files", "-z"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\0")
  .filter(Boolean);
for (const file of trackedFiles) {
  if (/(?:whatsapp.*\.txt|chat-export|private-chat)/i.test(file))
    errors.push(`Private export must not be tracked: ${file}`);
}

const currentDocs = [
  "README.md",
  "AGENTS.md",
  "CONTRIBUTING.md",
  "docs/ARCHITECTURE.md",
  "docs/COUNTRY_RESEARCH.md",
  "docs/EDITORIAL_POLICY.md",
  "docs/REPOSITORY_AUDIT.md",
  "docs/RESEARCH_STATUS.md",
];

for (const file of currentDocs) validateInternalLinks(file);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const legacyCount = countries.countries.filter(
  (country) => country.legacyTemplate,
).length;
console.log(
  `check: ok - ${countries.countries.length} countries, ${sources.sources.length} sources, ${legacyCount} legacy national templates declared`,
);

function validateInternalLinks(file) {
  const markdown = read(file);
  for (const match of markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const href = match[1].trim().replace(/^<|>$/g, "");
    if (!href || href.startsWith("#") || /^(?:https?:|mailto:)/.test(href))
      continue;
    const withoutFragment = href.split("#")[0].split("?")[0];
    if (!withoutFragment) continue;
    const decoded = decodeURIComponent(withoutFragment);
    const target = decoded.startsWith("/")
      ? path.join(root, decoded.slice(1))
      : path.resolve(path.dirname(resolve(file)), decoded);
    if (!fs.existsSync(target))
      errors.push(`Broken internal link in ${file}: ${href}`);
  }
}

function exists(file) {
  return fs.existsSync(resolve(file));
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
