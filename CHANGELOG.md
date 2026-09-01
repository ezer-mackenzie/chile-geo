# Changelog

All notable changes to this project will be documented here. The format follows Keep a Changelog and versions follow Semantic Versioning.

## [Unreleased]

## [0.4.0] - 2026-08-31

### Added

- Custom `colorScale` support shared by the Canvas and Three.js renderers.
- Typed `RegionColorContext` and `RegionColorScale` exports for application-owned palettes and legends.

### Changed

- Explicit per-record colors continue to take precedence over custom and built-in color scales.

## [0.3.0] - 2026-08-31

### Added

- Uniform programmatic region selection for both renderers through `selectRegion`, `clearSelection`, and `selectedRegionId`.
- Configurable `selectedColor` highlighting for Canvas outlines and Three.js emissive materials.

### Changed

- Pointer and keyboard activation now keep the public selection state synchronized.

## [0.2.0] - 2026-08-31

### Added

- Public metadata and runtime validation for all 16 Chilean region identifiers.
- Independent Vanilla 2D, Vanilla 3D, and Vue lifecycle examples.
- Browser coverage for UMD loading, pointer interaction, visual output, update performance, and GPU resource cleanup.
- Public `0.x` migration guidance.

### Changed

- Expanded package verification to cover the `/regions` entry point and all example builds.

## [0.1.0] - 2026-08-31

### Added

- Canvas-based `Chile2DMap` with responsive sizing, metric coloring, and pointer callbacks.
- Three.js-based `Chile3DMap` with extrusion, lighting, controls, and raycasting.
- Local simplified boundaries for all 16 Chilean regions.
- Typed ESM subpath exports, UMD distribution, tests, and project documentation.
- Browser-tested lifecycle, keyboard navigation, package-contract verification, and bounded metrics.
- VitePress documentation, CI workflows, compatibility checks, and release automation.
