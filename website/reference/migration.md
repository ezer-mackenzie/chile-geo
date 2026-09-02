# Migration during 0.x

The project is intentionally in the `0.x` series while public API feedback is collected. Every user-visible change is documented in the changelog and, when action is required, on this page.

## Region metadata

Applications should use the public metadata export instead of maintaining a duplicate identifier table:

```ts
import { CHILE_REGIONS, isChileRegionId, type ChileRegionId } from '@chile-geo/maps/regions';
```

`RegionData.id` remains a string so applications can validate external input at runtime. Use `isChileRegionId` at API boundaries and `ChileRegionId` for internal state.

## Compatibility promise

Patch releases in the same `0.x` minor line are compatible. A future `0.x` minor release may refine public APIs and will include explicit migration instructions. The API freezes at `1.0.0-rc.1` unless release-candidate testing reveals a blocker.

## From 0.2 to 0.3

No migration is required. Region activation now synchronizes `selectedRegionId`; applications can also call `selectRegion` and `clearSelection`. Use `selectedColor` to customize the highlight.

## From 0.3 to 0.4

No migration is required. The built-in color spectrum remains the default. Applications that need a categorical, quantile, divergent, or branded palette can provide `colorScale`; explicit `RegionData.color` values still have the highest priority.

## From 0.4 to 0.5

No migration is required. Applications that previously duplicated or imported internal geometry should switch to the supported `@chile-geo/maps/geography` entry.

## From 0.5 to 0.6

No migration is required for ordinary maps. A 3D map without controls now coalesces updates and renders on demand. Applications that animate custom scene objects must set `animationMode: 'continuous'`, or call `requestRender()` after each direct change.

## From 0.6 to 0.7

No migration is required. Both renderers now support `setVisibleRegions`; filtered regions are excluded from rendering, pointer interaction, keyboard navigation, and programmatic selection.

## From 0.7 to 0.8

No migration is required. The `/geography` entry now supports targeted feature, bounds, and extent-center lookups by public region ID.

## From 0.8 to 0.9

No consumer migration is required. This release hardens npm publication and rejects release tags that do not exactly match synchronized workspace versions.

## From 0.9 to 1.0.0

No consumer migration is required. Version 1.0.0 marks the production stable release with guaranteed public API stability.
