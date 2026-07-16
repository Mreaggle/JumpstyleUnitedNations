# Repository Audit

Last reviewed: 2026-07-16

## Current strengths

- A long-running Global Timeline with cross-border community input.
- National timeline paths for 19 countries.
- Key Figures, volunteer and community perspectives from multiple generations.
- Thematic archive areas for forums, media, competitions, voices and knowledge.
- A public museum at `jumpstyle.com.br/JUN/` that makes selected material easier to browse.
- New evidence, privacy and agent operating policies.

## Current structural debt

### National timelines

All 19 national files retain the original year/month placeholder scaffold. Some have useful contributions mixed into the template, but an agent cannot assume that a file is mature because it exists. Germany appears in Key Figures and the Global Timeline but has no national file.

### Duplicate navigation and prose

The legacy root README combined project identity, volunteers, communities, utilities, governance and contribution instructions. It is preserved in `docs/legacy/README-2025.md`; the current README is now a concise navigation and trust layer.

`JumpstyleTimeline/README.md` also contains a large duplicated timeline table. The canonical cross-border chronology should be treated as `JumpstyleTimeline/Global/global-timeline.md` until a future migration explicitly reconciles both views.

### Scaffold project pages

Several `JumpstyleArchive/` and `DigitalJumpstylePlatform/` README files describe planned feeds or tools and use `#` placeholders. They are project concepts, not populated databases. Future work should add a visible maturity label to each area before expanding it.

### Contributor data

Volunteer counts and summary lists contain inconsistencies inherited from manual editing. Names and public links remain historically useful, but the file should eventually be converted to structured data with aliases, country, role, active years and consent status.

### Link health

Community and social links can expire or change ownership. The repository validates internal links but does not yet run a scheduled external link-health job. Broken external links should be archived before replacement.

## Recommended migration phases

1. **Trust layer:** policies, registries, privacy controls and validation. Completed in the current refactor.
2. **Source inventory:** normalize public URLs and historical metadata.
3. **National extraction:** replace template sections with evidence-backed country records.
4. **People data:** convert volunteers and Key Figures to structured records while preserving prose views.
5. **Archive maturity:** label thematic folders as active, planned, legacy or archived.
6. **Generated views:** generate Markdown tables and museum feeds from structured source data.
7. **Link preservation:** add scheduled external checks and Wayback recovery queues.

## Deliberately deferred work

This refactor does not delete placeholder-heavy national files, rewrite contributor testimony, rename established paths or claim that the source registry is complete. Those changes require country-level research and review rather than a mechanical repository cleanup.
