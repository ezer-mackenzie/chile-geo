# Geographic data

## Source

The bundled boundaries derive from Chilean administrative vector datasets distributed by the Biblioteca del Congreso Nacional de Chile (BCN). Source archives are not fetched at runtime. Maintainers process a local snapshot so applications remain deterministic and work offline.

## Processing

The renderer asset is produced by reprojecting source shapefiles to WGS84, simplifying while preserving shapes, rounding coordinates to at most four decimal places, retaining only `id` and `name`, converting BCN numeric codes to subdivision identifiers such as `CL-RM`, and serializing a compact GeoJSON `FeatureCollection`.

## Scope and limitations

- The embedded rendering asset contains all 16 region boundaries. Non-administrative source features such as `Zona sin demarcar` are excluded.
- It is suitable for dashboards and thematic maps, not cadastral, navigation, surveying, or legal boundary work.
- Offshore polygons and detailed coastlines may be generalized.
- Administrative boundaries can change. Record the package version when reproducibility matters.
- Bundled region labels use standardized English names. Spanish source-field identifiers are read only where required by the BCN input schema.

## Updating the snapshot

Place authorized BCN archives in `raw-data/`, run `bun run process-data`, inspect the results, and run `bun run scripts/build-map-asset.ts`. Validate feature count, identifiers, coordinate precision, and bundle size before committing.

## Attribution

When publishing a map, credit the Biblioteca del Congreso Nacional de Chile as the boundary-data source and include the application author's metric-data attribution.
