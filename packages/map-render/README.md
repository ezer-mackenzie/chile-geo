# `@chile-geo/maps`

Responsive Canvas 2D and Three.js 3D thematic maps of Chile. Geographic boundaries are bundled locally and public APIs are strictly typed.

```bash
bun add @chile-geo/maps
```

Use `@chile-geo/maps/2d` for the smallest Canvas-only dependency graph. Use `@chile-geo/maps/3d` after installing the `three` peer dependency. Both classes accept `updateData(RegionData[])`, expose uniform selection controls, support application-owned `colorScale` functions, and provide `destroy()` for lifecycle cleanup.

Use `@chile-geo/maps/geography` for a renderer-independent GeoJSON copy and its source metadata.

The 3D renderer supports `auto`, `continuous`, and `on-demand` animation modes. Automatic mode avoids an idle render loop and respects reduced-motion preferences.

Complete usage, API tables, browser support, and data attribution are maintained in the repository [README](../../README.md) and [API reference](../../docs/API.md).
