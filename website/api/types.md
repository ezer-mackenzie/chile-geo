# Public types

## `RegionData`

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | `string` | Stable `CL-*` region identifier |
| `name` | `string` | English metric label supplied by the consumer |
| `value` | `number` | Value used for normalization |
| `color` | `string?` | Optional CSS color override |

`BaseMapOptions` requires `container` and optionally accepts `defaultColor`, `onRegionClick`, and `onRegionHover`. `Map2DOptions` adds `pixelRatio`, `strokeColor`, and `strokeWidth`. `Map3DOptions` adds `maxExtrusionDepth` and `enableControls`.
