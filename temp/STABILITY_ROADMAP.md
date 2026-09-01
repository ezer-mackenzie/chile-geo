# Chile Geo Stability Roadmap

Status: planning document  
Target: first stable release (`1.0.0`)  
Documentation language for the first release: English

## Objective

Deliver `@chile-geo/maps` as a predictable browser library for production dashboards. A stable release must render correct regional geometry, preserve public API compatibility, avoid leaking browser or WebGL resources, publish reproducible artifacts, and provide enough documentation for a user to integrate either renderer without reading the source.

## Recommended documentation stack

Use **VitePress** as the Node.js alternative to MkDocs.

Why it fits this repository:

- It converts Markdown into a static documentation site and includes a technical-documentation theme.
- It is based on Vite, matching the library's existing build stack.
- It supports TypeScript configuration, file-based routing, local search, custom Vue components, and static deployment.
- Interactive map examples can be implemented as client-only Vue components while most documentation remains plain Markdown.
- The output can be hosted on GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any static server.

Prefer VitePress over Docusaurus for this project unless documentation later requires a large React application, extensive versioned documentation, or a complex plugin ecosystem. VitePress is the closer replacement for MkDocs because it keeps the Markdown-first workflow small.

Current VitePress releases require Node.js 22 or newer. This does not replace Bun as the project package manager; Bun can run the VitePress CLI and scripts.

Suggested setup after the core release gates are in place:

```bash
bun add --dev vitepress@next
bun vitepress init
```

Choose `./website` as the documentation root so the existing `docs/` Markdown reference files can remain stable until they are deliberately migrated. Add these scripts:

```json
{
  "scripts": {
    "docs:dev": "vitepress dev website",
    "docs:build": "vitepress build website",
    "docs:preview": "vitepress preview website"
  }
}
```

Do not add Spanish pages during the initial stabilization work. Design the navigation for future `/es/` content, but keep English as the source and default locale.

## Definition of stable

Version `1.0.0` is ready only when all of the following are true:

- The 2D and 3D entry points work in real browsers, not only at type-check time.
- All 16 regions render, can be selected, and map to the correct `CL-*` identifier.
- Repeated `updateData` calls do not recreate the Canvas or WebGL context.
- Repeated construction and destruction does not retain observers, event listeners, animation frames, geometries, materials, or WebGL contexts.
- Package exports work through ESM, the documented UMD path, and TypeScript declarations.
- Importing `@chile-geo/maps/2d` does not load or require Three.js.
- The package works at its declared minimum Three.js version and its latest tested version.
- Automated checks run on every pull request and protected branch update.
- The package can be packed, installed into a clean consumer project, built, and executed.
- Public APIs and behavior are documented in English and covered by a compatibility policy.
- Geographic provenance, simplification, limitations, and update procedure are documented.

## Phase 0 — Correctness blockers

Priority: immediate. Do not publish a public release before completion.

### Browser integration tests

- Add Playwright with Chromium, Firefox, and WebKit projects.
- Build a minimal test page for `Chile2DMap` and another for `Chile3DMap`.
- Assert that each renderer creates exactly one output element and displays all 16 regions.
- Test pointer hover and click callbacks using stable screen coordinates or exposed test fixtures.
- Resize the host container and verify Canvas backing dimensions, camera aspect, and renderer dimensions.
- Call `updateData` repeatedly and verify that the original Canvas/WebGL DOM element remains attached.
- Call `destroy()` twice and assert that it is safe and removes the renderer.
- Add a WebGL-unavailable test and document the expected constructor error or fallback policy.

### Geometry and projection validation

- Add a fixture containing expected IDs and English names for every region.
- Validate geometry type, non-empty rings, closed rings, finite coordinates, and WGS84 bounds.
- Detect self-intersections or Mapshaper repair warnings during data generation.
- Add visual snapshots for the complete 2D map at desktop and mobile aspect ratios.
- Verify holes and multipolygons in both rendering engines, particularly southern islands.
- Record the processed source date and a checksum in generated metadata.

### Runtime robustness

- Define behavior for duplicate IDs in `updateData`; recommended policy: last record wins and development builds warn.
- Define behavior for unknown IDs, empty series, negative values, `NaN`, and `Infinity`.
- Validate `maxExtrusionDepth`, `pixelRatio`, colors, and zero-sized containers.
- Clamp the Canvas pixel ratio to prevent excessive memory use on high-density displays.
- Ensure pointer hit testing remains correct at non-default device pixel ratios.
- Add keyboard focus and selection or explicitly document pointer-only interaction before `1.0.0`.
- Respect `prefers-reduced-motion` or provide a render-on-demand mode for 3D when controls are disabled.

## Phase 1 — Package contract

Priority: required for a release candidate.

### Export and bundle verification

- Add automated bundle tests for `@chile-geo/maps`, `/2d`, `/3d`, and `/types`.
- Confirm the 2D bundle contains no `three` import with a bundle analyzer or text assertion.
- Decide whether the combined root entry should require the optional Three.js peer. If ambiguity remains, document subpath imports as the supported production path.
- Test ESM imports in Vite and a plain Node-based bundler.
- Test the UMD artifact in a browser with the expected Three.js global.
- Check declaration paths by compiling a clean strict TypeScript consumer.
- Add `publint` and `arethetypeswrong` checks to the release gate.
- Run a package dry-run and inspect the file list and compressed size.

### Compatibility policy

- Declare supported browsers and minimum versions based on Playwright results.
- Declare the supported Three.js range and test both ends of that range.
- Document semantic-versioning rules for constructors, options, callback behavior, identifiers, and data updates.
- Add deprecation rules: retain a deprecated API for at least one minor release before removal.
- Decide whether region boundary updates are patch or minor changes and document the decision.

### Performance budgets

- Set maximum compressed sizes for `/2d`, `/3d`, and the geographic asset.
- Benchmark first render, resize, hit testing, and 100 consecutive data updates.
- Measure heap and GPU resource use before construction and after destruction.
- Test a low-end mobile viewport and a high-density desktop viewport.
- Fail CI when bundle size exceeds the agreed budget without an explicit review.

## Phase 2 — Automation and release engineering

Priority: required for `1.0.0`.

### Continuous integration

Create a CI workflow that runs:

```bash
bun install --frozen-lockfile
bun run check
bun test
bun run build
bun run test:browser
bun run docs:build
```

Also run package-contract checks, bundle-size checks, and a clean consumer installation. Cache dependencies but never cache build results used for release verification.

### Release process

- Add a release checklist and npm provenance publishing.
- Use Changesets or a small documented manual release process; prefer Changesets if more packages will be published.
- Generate release notes from reviewed changes rather than commit subjects alone.
- Publish a release candidate, integrate it into a separate example application, and leave it under observation before `1.0.0`.
- Tag the exact BCN data snapshot used by the release.
- Verify npm package contents after publication and keep a documented rollback/deprecation procedure.

## Phase 3 — Documentation site

Priority: required for broad adoption; build before the stable release announcement.

### VitePress information architecture

```text
website/
├── .vitepress/
│   ├── config.ts
│   └── theme/
├── index.md
├── guide/
│   ├── installation.md
│   ├── canvas-2d.md
│   ├── webgl-3d.md
│   ├── data-updates.md
│   └── lifecycle.md
├── api/
│   ├── types.md
│   ├── chile-2d-map.md
│   └── chile-3d-map.md
├── examples/
│   ├── choropleth.md
│   ├── custom-colors.md
│   └── extrusion.md
└── reference/
    ├── browser-support.md
    ├── data.md
    └── migration.md
```

### Documentation requirements

- Provide copy-paste examples with explicit container dimensions and cleanup.
- Add live 2D and 3D examples loaded only in the browser to remain SSR-safe.
- Document every option, default, callback, public property, error, and lifecycle expectation.
- Add an identifier table containing the 16 region IDs and English labels.
- Explain why `/2d` is the preferred import for Canvas-only applications.
- Add accessibility guidance, troubleshooting, performance guidance, and framework integration examples.
- Enable local search and broken-link validation.
- Build documentation in CI and preview the production output before deployment.
- Deploy English documentation at `/`; reserve `/es/` for the later Spanish translation.

## Phase 4 — Release candidate validation

Priority: final gate.

Create clean example applications for:

- Vanilla TypeScript with Vite and the 2D subpath.
- Vanilla TypeScript with Vite, Three.js, and the 3D subpath.
- At least one component framework with correct mount/unmount cleanup.
- Script-tag consumption of the UMD build if UMD remains an advertised format.

Run a release-candidate period and collect:

- Integration failures and unclear documentation.
- Browser-specific rendering differences.
- Performance measurements on representative desktop and mobile hardware.
- Boundary or identifier reports checked against the pinned source snapshot.

Only promote to `1.0.0` when no Phase 0 or Phase 1 issues remain and all automated release gates are green.

## Suggested milestone sequence

| Milestone | Outcome |
| --- | --- |
| `0.2.0` | Browser integration tests, validated geometry, defined edge cases |
| `0.3.0` | Verified package exports, compatibility matrix, performance budgets |
| `0.4.0` | CI, package smoke tests, release automation |
| `0.5.0` | VitePress English documentation and live examples |
| `1.0.0-rc.1` | External consumer validation and release observation |
| `1.0.0` | Stable API, reproducible artifacts, complete release gates |

## Immediate next actions

1. Create or verify ownership of the `chile-geo` organization on npm.
2. Bootstrap `@chile-geo/maps@0.9.0` interactively if npm requires the package to exist before its trusted publisher can be configured.
3. Configure `publish.yml` as the npm trusted publisher and revoke any bootstrap token.
4. Publish the remaining historical tags in order through the trusted workflow, then install `0.9.0` in two external applications and record any integration issues.
5. Publish `1.0.0-rc.1` under the `next` dist-tag after the external checks pass.
6. Observe the candidate, rerun the full verification matrix, and promote the unchanged API to `1.0.0`.

## Decision log

- Documentation generator: VitePress.
- Package manager: Bun.
- Documentation source language: English.
- Future translation location: `/es/`.
- Runtime geographic data: bundled and offline.
- Stable-release rule: automated browser and package verification is mandatory.
- Primary registry: npm; GitHub Packages remains an optional secondary channel after `1.0.0`.
- First-publication rule: bootstrap with a short-lived token, then use npm trusted publishing through GitHub OIDC.
