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

Trusted publishing cannot be configured until the package exists on npm. The `@chile-geo` scope must belong to an npm user or organization; owning the similarly named GitHub repository does not grant npm permissions.

Before the first publication:

1. Sign in to npm with two-factor authentication enabled.
2. Create the free public npm organization named `chile-geo`, or confirm that the publishing account has write access to that existing organization.
3. Publish the package once interactively or with npm staged publishing if npm does not yet expose package settings for the unpublished name. Do not place this bootstrap credential in the repository.
4. In GitHub, create the protected environment named `npm` and add deployment approval rules if desired. No npm token is required by the workflow.
5. In the npm package settings, configure a GitHub Actions trusted publisher with user `ezer-mackenzie`, repository `chile-geo`, workflow `publish.yml`, environment `npm`, and permission to run `npm publish`.
6. Move the unpublished `v0.9.0` tag to the reviewed repair commit, push `main`, and force-update only that tag with `git push --force origin refs/tags/v0.9.0`.
7. Confirm that the workflow publishes `@chile-geo/maps@0.9.0` and that `npm view @chile-geo/maps@0.9.0` succeeds.
8. Revoke any bootstrap token. Future releases authenticate exclusively through OIDC.

The publish job uses Node 24, npm 11.15 or newer, a GitHub-hosted runner, and `id-token: write`, which satisfy npm trusted-publishing requirements. It does not receive `NPM_TOKEN`; npm exchanges the GitHub OIDC identity for a short-lived publish credential during `npm publish`.

An npm `E404` during the package `PUT` can mean that the scope does not exist or that the current identity cannot publish to it. A successful provenance upload does not prove registry write authorization.

## Registry choice

npm is the primary registry for this library because ordinary Node.js, Bun, npm, pnpm, and Yarn consumers can install it without extra registry configuration. GitHub Packages is a valid secondary registry, but its npm packages must use a GitHub user or organization namespace and consumers may need registry authentication and an `.npmrc` scope mapping. Publishing there would therefore require renaming the package or creating a matching GitHub organization; it does not solve ownership of the `@chile-geo` npm scope.

Do not publish the same package name to multiple registries until npm publication, provenance, support expectations, and version synchronization are stable.

## Candidate

1. Set an `-rc.N` version in the workspace and publishable package.
2. Build and run `bun run test:package`.
3. Run `RELEASE_TAG=vX.Y.Z-rc.N bun run release:check`.
4. Create an annotated `vX.Y.Z-rc.N` tag.
5. Publish with the `next` npm tag and provenance from CI.
6. Install the exact candidate in clean 2D and 3D applications.

For this repository, publish and validate `0.9.0` first. The next tag should be `v1.0.0-rc.1`; promote it to `v1.0.0` only after the registry and external-consumer checks pass.

## Stable release

1. Remove the prerelease suffix and update the changelog date.
2. Run the complete verification suite from a clean checkout.
3. Create an annotated `vX.Y.Z` tag and a matching `data-bcn-YYYY-MM-DD` tag.
4. Run `RELEASE_TAG=vX.Y.Z bun run release:check` and push the commit and tag only after it succeeds.
5. Publish from the protected GitHub release workflow with npm provenance.
6. Verify package contents and documentation after publication.

If a faulty package is published, stop promotion, deprecate the affected npm version with a clear message, prepare a patch, and never rewrite an existing release tag.
