# Geographic data API

Import the renderer-independent data entry when an application needs the bundled boundaries directly:

```ts
import {
  CHILE_GEOGRAPHY_METADATA,
  getChileRegionsGeoJSON,
} from '@chile-geo/maps/geography';

const regions = getChileRegionsGeoJSON();
console.log(regions.features.length); // 16
console.log(CHILE_GEOGRAPHY_METADATA.sourceSnapshotDate);
```

`getChileRegionsGeoJSON()` returns a new `RegionFeatureCollection` on every call. Mutating it cannot change later results or renderer geometry. `CHILE_GEOGRAPHY_METADATA` exposes the source, snapshot date, CRS, coordinate precision, feature count, and SHA-256 checksum.

This entry does not import Three.js or either rendering engine.
