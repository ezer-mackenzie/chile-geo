# Release process

## Preconditions

- The working tree is clean and the intended commit is reviewed.
- `bun install --frozen-lockfile` succeeds.
- `bun run verify` succeeds locally.
- CI succeeds, including all three Playwright browsers.
- Package changes and geographic data changes are documented in `CHANGELOG.md`.
- The package version follows Semantic Versioning.

## Candidate

1. Set an `-rc.N` version in the workspace and publishable package.
2. Build and run `bun run test:package`.
3. Create an annotated `vX.Y.Z-rc.N` tag.
4. Publish with the `next` npm tag and provenance from CI.
5. Install the exact candidate in clean 2D and 3D applications.

## Stable release

1. Remove the prerelease suffix and update the changelog date.
2. Run the complete verification suite from a clean checkout.
3. Create an annotated `vX.Y.Z` tag and a matching `data-bcn-YYYY-MM-DD` tag.
4. Push the commit and tags only after review.
5. Publish from the protected GitHub release workflow with npm provenance.
6. Verify package contents and documentation after publication.

If a faulty package is published, stop promotion, deprecate the affected npm version with a clear message, prepare a patch, and never rewrite an existing release tag.
