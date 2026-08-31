# Compatibility and versioning

Chile Geo follows Semantic Versioning.

- Breaking constructor, option, callback, identifier, or lifecycle changes require a major release.
- Additive options and capabilities require a minor release.
- Bug fixes, documentation corrections, and geometry corrections that do not change administrative identity use patch releases.
- Administrative boundary updates or identifier additions require a minor release and a data-source note.
- Deprecated APIs remain available for at least one minor release before removal in a major release.

The `/2d` and `/3d` entry points are stable package contracts. The filenames inside `dist/`, mesh implementation details, generated color values, and simplified coordinate sequences are not public API.

UMD remains a distribution artifact for direct browser delivery. ESM subpath imports are the supported package-manager interface.
