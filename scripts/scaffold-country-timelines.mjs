import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");
const catalogPath = resolve("data/country-catalog.json");
const registryPath = resolve("data/country-research.json");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const byCode = new Map(registry.countries.map((country) => [country.code, country]));
const missingEntries = [];
const missingFiles = [];

for (const entry of catalog.countries) {
  let country = byCode.get(entry.code);
  if (!country) {
    country = {
      code: entry.code,
      name: entry.name,
      timeline: `JumpstyleTimeline/${directoryName(entry.name)}/${entry.code.toLowerCase()}-timeline.md`,
      status: "research-needed",
      legacyTemplate: false,
    };
    registry.countries.push(country);
    byCode.set(entry.code, country);
    missingEntries.push(entry.code);
  }

  if (!country.timeline || fs.existsSync(resolve(country.timeline))) continue;
  missingFiles.push(country.timeline);
  if (!checkOnly) {
    fs.mkdirSync(path.dirname(resolve(country.timeline)), { recursive: true });
    fs.writeFileSync(
      resolve(country.timeline),
      `# Jumpstyle Timeline\n\n## ${country.name}\n\n` +
        "This national or territorial view is synchronized from sourced records in the Global Timeline.\n",
    );
  }
}

registry.countries.sort((a, b) =>
  a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
);

if (checkOnly && (missingEntries.length || missingFiles.length)) {
  console.error(
    [
      missingEntries.length
        ? `Missing registry entries: ${missingEntries.join(", ")}`
        : "",
      missingFiles.length
        ? `Missing timeline files:\n${missingFiles.join("\n")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n"),
  );
  process.exit(1);
}

if (!checkOnly && missingEntries.length) {
  fs.writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
}

console.log(
  `${checkOnly ? "check" : "scaffold"}: ${catalog.countries.length} country and territory records, ` +
    `${missingEntries.length} registry entries and ${missingFiles.length} timeline files added`,
);

function directoryName(name) {
  return name.replaceAll("/", "-");
}

function resolve(file) {
  return path.join(root, file);
}
