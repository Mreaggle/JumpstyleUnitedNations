# Contributing to JUN

JUN welcomes historians, jumpers, DJs, organizers, developers and archivists. Contributions should improve the evidence trail, not only add volume.

## Choose a contribution type

- **Historical event:** a dated meeting, release, competition, community milestone or media appearance.
- **Source recovery:** a Wayback snapshot, deleted-forum index or mirror of public metadata.
- **National history:** context for one country, preferably reviewed by someone connected to that scene.
- **Key figure:** a sourced explanation of influence, era and country.
- **Documentation:** clearer research methods, navigation or data structure.

## Historical event format

Provide these fields in the issue or pull request:

```text
Event name:
Country and city:
Event date:
Upload date:
Archive date:
People or crews:
Public source URL:
Archived URL:
Source language:
Evidence status:
Notes:
```

Dates that are not known must be written as `unknown`; do not estimate silently. If only the upload date exists, say `event date unknown; upload date used as fallback`.

## Evidence labels

- `verified`: supported by an official record or multiple independent reliable sources.
- `supported`: supported by a strong contemporary source or original public media metadata.
- `community-lead`: useful first-person or community information that still needs public corroboration.
- `unverified`: retained in the research queue but not ready for the timeline.

## Pull request checklist

1. Search for duplicate names, events and URLs.
2. Keep the change focused on one country, event group or documentation concern.
3. Do not delete global timeline entries while adding research.
4. Do not include private chat exports, phone numbers or personal contact data.
5. Update the source and country registries when applicable.
6. Run `npm run check`.
7. Explain uncertainty and date fallbacks in the pull request.

## Private material

Private chats may point researchers toward public videos or archives, but the original messages and files must remain outside Git. Never attach them to issues or pull requests. Replace a private lead with a public URL before adding it to the historical record.

## Conduct

Credit creators, preserve cultural and national perspectives, challenge claims with evidence rather than status, and avoid turning historical disagreement into personal conflict.
