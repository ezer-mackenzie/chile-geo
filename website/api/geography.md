# Geographic data API

Import the renderer-independent data entry when an application needs the bundled boundaries directly:

```ts
import {
  CHILE_GEOGRAPHY_METADATA,
  getChileRegionBounds,
  getChileRegionCenter,
  getChileRegionFeature,
  getChileRegionsGeoJSON,
} from '@chile-geo/maps/geography';

const regions = getChileRegionsGeoJSON();
console.log(regions.features.length); // 16
console.log(CHILE_GEOGRAPHY_METADATA.sourceSnapshotDate);

const feature = getChileRegionFeature('CL-RM');
const bounds = getChileRegionBounds('CL-RM');
const center = getChileRegionCenter('CL-RM');
```

`getChileRegionsGeoJSON()` returns a new `RegionFeatureCollection` on every call. Mutating it cannot change later results or renderer geometry. `CHILE_GEOGRAPHY_METADATA` exposes the source, snapshot date, CRS, coordinate precision, feature count, and SHA-256 checksum.

This entry does not import Three.js or either rendering engine.

Lookup functions return `undefined` for unknown IDs. Features are cloned before being returned. Bounds use WGS84 longitude and latitude. `getChileRegionCenter` returns the center of the geographic extent, which is useful for initial camera placement but is not a polygon centroid or guaranteed label point.
