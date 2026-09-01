# Public types

## `RegionData`

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | `string` | Stable `CL-*` region identifier |
| `name` | `string` | English metric label supplied by the consumer |
| `value` | `number` | Value used for normalization |
| `color` | `string?` | Optional CSS color override |

`BaseMapOptions` requires `container` and optionally accepts `defaultColor`, `selectedColor`, `onRegionClick`, and `onRegionHover`. `Map2DOptions` adds `pixelRatio`, `strokeColor`, and `strokeWidth`. `Map3DOptions` adds `maxExtrusionDepth` and `enableControls`.

## Region metadata

`CHILE_REGIONS` is a readonly list of the 16 public IDs and standardized English labels. `ChileRegionId`, `ChileRegionName`, and `ChileRegion` derive directly from that list. `isChileRegionId(value)` validates unknown strings at runtime.
