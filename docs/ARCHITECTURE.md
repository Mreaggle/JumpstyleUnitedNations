# Repository Architecture

## Design goals

- Keep historical URLs stable.
- Separate published records from research queues and templates.
- Make maturity and evidence legible to humans and agents.
- Keep private discovery material outside version control.
- Support incremental country-by-country improvement.

## Information layers

### Published historical record

`JumpstyleTimeline/Global/global-timeline.md` contains cross-border milestones.
`data/global-event-countries.json` assigns each detailed global record to zero
or more countries, and `npm run sync:national` publishes those records inside
marked generated blocks in every country timeline. Global-only context may have
an empty assignment. Country-authored material remains outside the generated
blocks. National maturity must still be checked in `data/country-research.json`.

### Curated indexes

`JUNToolkit/KeyFiguresWorldwide/`, `CommunityMapping/` and `Volunteers.md` organize people and communities. They are indexes, not substitutes for source-backed biographies.

### Thematic archive

`JumpstyleArchive/` groups forums, media, competitions, art, portals and oral history. Some subdirectories are project scaffolds and should be labeled before data extraction.

### Research control plane

`data/` contains machine-readable country and source status plus the global-to-national event assignment manifest. `docs/` defines policy, current coverage and multilingual research plans. Agents should read these before editing timelines.

### Legacy contributor material

`HowTo/` and several thematic README files predate the current evidence model. They remain available for historical continuity. New operational guidance belongs in `CONTRIBUTING.md`, `AGENTS.md` and `docs/`.

## Evidence lifecycle

```text
private or public lead
        |
        v
research queue -> public source check -> date normalization
        |                                  |
        +------- unresolved <--------------+
                                           |
                                           v
                               national or global timeline
                                           |
                                           v
                              museum and machine-readable views
```

Private leads never move into Git. Only the resulting public URL and non-private research metadata may enter the repository.

## Compatibility policy

Existing timeline and archive paths should remain stable. Prefer adding navigation documents and registries over moving historical files. If a path must change, update all internal links and preserve a small replacement document at the old location.
