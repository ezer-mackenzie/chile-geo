# Contributing

Thank you for improving Chile Geo. Contributions should keep the public API small, browser-focused, strictly typed, and written in English.

## Setup

Install Bun 1.2 or newer, clone the repository, and run `bun install`. Before submitting a change, run `bun run check`, `bun test`, and `bun run build` from the workspace root.

## Changes

- Open an issue before large API or dataset changes.
- Keep Three.js behind the 3D entry point and as a peer dependency.
- Do not add runtime network requests for geographic data.
- Include tests for geometry, identifiers, metric behavior, and regressions.
- Update public documentation when behavior or types change.
- Do not commit raw archives, temporary extraction directories, dependencies, or build output.

Use Conventional Commit subjects such as `feat(maps): add keyboard selection`, `fix(2d): correct pointer scaling`, or `docs: clarify data attribution`. Keep commits focused and avoid unrelated formatting.

## Geographic updates

Use a traceable BCN source snapshot. Run the processing pipeline, retain only required properties, cap precision at four decimals, and inspect the visual result. Explain source date and administrative changes in the pull request.

By contributing, you agree that your work is licensed under the repository's MIT License and that you will follow the Code of Conduct.
