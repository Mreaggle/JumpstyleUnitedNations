# Agent Operating Guide

This file defines how AI agents and automated contributors must work in the Jumpstyle United Nations repository.

## Mission

Preserve global Jumpstyle history with traceable evidence, clear uncertainty and respect for the people whose work created the culture.

## Non-negotiable rules

1. Never commit private chats, contact exports, private group links, phone numbers or personal data.
2. Treat private community conversations only as discovery leads. Promote only information supported by a public source or an explicitly approved first-person record.
3. Do not publish legacy placeholders such as `Event or Contribution 1` as historical facts.
4. The global timeline is add-only by default. Do not delete existing events while enriching it. Corrections require an explicit maintainer request and a documented reason.
5. Never invent dates. Use the event date in a title or description; otherwise label the upload date as a fallback. An archive snapshot date proves page availability, not necessarily the event date.
6. Keep original URLs and add Wayback URLs when a live source is fragile or unavailable.
7. Separate fact, community testimony and inference. State uncertainty directly.
8. Preserve aliases, diacritics and country context. Do not merge people solely because names look similar.
9. Do not reorganize or rename historical paths without checking inbound Markdown links and documenting redirects or replacements.
10. Run `npm run check` before reporting work complete.

## Source hierarchy

Prefer sources in this order:

1. Official records: artist, label, chart, event organizer or platform metadata.
2. Contemporary journalism or institutional coverage.
3. Original video title, description, upload metadata and channel context.
4. Archived forums, community portals and calendars.
5. First-person testimony with clear attribution and approval.
6. Secondary compilations, used only as leads unless independently confirmed.

## Evidence workflow

1. Search `data/source-registry.json` and existing timelines for duplicates.
2. Record the public URL, source type, language, country and access status.
3. Determine `event_date`, `upload_date` and `archive_date` separately.
4. Assign an evidence status defined in `docs/EDITORIAL_POLICY.md`.
5. Add the smallest useful timeline entry without rewriting unrelated history.
6. Update `data/country-research.json` when a country's maturity changes.
7. Keep `data/country-catalog.json` complete and run `npm run scaffold:countries`
   when a catalog entry or national path is added.
8. Update `data/global-event-countries.json` and run `npm run sync:national`
   when a Global Timeline event is added or changed.
9. Keep the public museum synchronized: the site pipeline must consume this
   repository's `JumpstyleTimeline/Global/global-timeline.md`, derive its event
   count at build time and fail when its generated copy or manifest differs.
   Never update the front-end count independently from the canonical timeline.
10. After a Global Timeline change reaches `main`, trigger the
    `jun-timeline-updated` dispatch (or manually run the site deploy) in
    `Mreaggle/jumpstylebrasil` and verify the published full-record count.
11. Run the repository validator and inspect the diff for accidental deletions.

## Repository ownership

- `JumpstyleTimeline/Global/`: cross-border chronology and globally relevant milestones.
- `JumpstyleTimeline/<Country>/`: national perspective; many files are legacy templates.
- `JUNToolkit/KeyFiguresWorldwide/`: influence index, not a definitive ranking.
- `JumpstyleArchive/`: source collections and thematic archives.
- `data/`: machine-readable status and source registries.
- `docs/`: policies, architecture, research status and historical snapshots.
- `HowTo/`: legacy contributor documentation; modern instructions belong in `CONTRIBUTING.md` and `docs/`.

## Privacy check

Before any commit, inspect `git status --short` and `git ls-files`. Filenames containing `whatsapp`, `chat-export`, `private-chat` or similar private-export markers must not be tracked. Do not quote private messages in issues, pull requests, commit messages or generated summaries.

## Definition of done

A research change is complete only when its claim is specific, its date treatment is explicit, its source is public, its country context is recorded, no private material is exposed and `npm run check` passes.
