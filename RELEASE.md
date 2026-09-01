# Release process

## Preconditions

- The working tree is clean and the intended commit is reviewed.
- `bun install --frozen-lockfile` succeeds.
- `bun run verify` succeeds locally.
- CI succeeds, including all three Playwright browsers.
- Package changes and geographic data changes are documented in `CHANGELOG.md`.
- The package version follows Semantic Versioning.
- The annotated Git tag exactly matches the publishable package version.

## First publication bootstrap

Trusted publishing cannot be configured until the package exists on npm. Before the first publication:

1. Confirm that the npm account or organization `chile-geo` exists and that the publishing account can create public packages in that scope.
2. Create a short-lived granular npm access token with read/write package permission for the `@chile-geo` scope and workflow-compatible 2FA settings.
3. Add it as the `NPM_TOKEN` secret in the protected GitHub environment named `npm`.
4. Push exactly one reviewed release tag and confirm that the package is visible on npm.
5. In the npm package settings, configure a GitHub Actions trusted publisher for organization/user `ezer-mackenzie`, repository `chile-geo`, workflow `release.yml`, and environment `npm`.
6. Remove the GitHub `NPM_TOKEN` secret and revoke the bootstrap token. Future releases authenticate through OIDC.

An npm `E404` during the package `PUT` can mean that the scope does not exist or that the current identity cannot publish to it. A successful provenance upload does not prove registry write authorization.

## Candidate

1. Set an `-rc.N` version in the workspace and publishable package.
2. Build and run `bun run test:package`.
3. Run `RELEASE_TAG=vX.Y.Z-rc.N bun run release:check`.
4. Create an annotated `vX.Y.Z-rc.N` tag.
5. Publish with the `next` npm tag and provenance from CI.
6. Install the exact candidate in clean 2D and 3D applications.

## Stable release

1. Remove the prerelease suffix and update the changelog date.
2. Run the complete verification suite from a clean checkout.
3. Create an annotated `vX.Y.Z` tag and a matching `data-bcn-YYYY-MM-DD` tag.
4. Run `RELEASE_TAG=vX.Y.Z bun run release:check` and push the commit and tag only after it succeeds.
5. Publish from the protected GitHub release workflow with npm provenance.
6. Verify package contents and documentation after publication.

If a faulty package is published, stop promotion, deprecate the affected npm version with a clear message, prepare a patch, and never rewrite an existing release tag.
