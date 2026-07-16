# Machine-readable Research Data

This directory exposes repository maturity and source information without requiring an agent to infer status from prose.

## `country-research.json`

Each country record contains:

- `code`: ISO-style two-letter project code.
- `name`: English country name.
- `timeline`: repository-relative timeline path, or `null` when no file exists.
- `status`: `research-in-progress`, `research-needed` or `no-national-file`.
- `legacyTemplate`: whether the national file still contains original placeholder scaffolding.

The registry includes countries represented by national files, JUN contributors, Key Figures or established Global Timeline events. Update the status only after inspecting the national file and its public evidence.

## `source-registry.json`

Each public source contains:

- `id`: stable lowercase identifier.
- `type`: source category.
- `language`: source language code.
- `countries`: related country codes or `GLOBAL`.
- `status`: evidence status from `docs/EDITORIAL_POLICY.md`.
- `url`: canonical public or archived URL.

The registry is not a complete bibliography yet. It records sources independently checked during the current research pass and should grow as national reviews progress.

## Privacy boundary

Never create a registry for raw private messages. A private lead may result in a public source record only after the public URL and non-private metadata have been independently checked.
