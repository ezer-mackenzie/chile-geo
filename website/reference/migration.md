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
