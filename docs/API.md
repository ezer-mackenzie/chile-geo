# API reference

## `RegionData`

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Region identifier, such as `CL-RM` or `CL-VS` |
| `name` | `string` | Consumer-provided display name for the metric |
| `value` | `number` | Metric used for color and extrusion normalization |
| `color` | `string?` | Optional CSS color override |

Rendering and callbacks match records by `id`. The bundled geographic name is passed as the first callback argument; the matching consumer record is passed as the second argument.

`RegionColorScale` receives `{ id, name, value, maximum, data }`. An explicit `RegionData.color` always takes precedence over the scale.

## `BaseMapOptions`

| Option | Default | Description |
| --- | --- | --- |
| `container` | required | Host element that owns the renderer |
| `defaultColor` | `#94a3b8` | Fill used when no positive metric is available |
| `selectedColor` | renderer-specific | Outline or emissive color used for the selected region |
| `colorScale` | generated spectrum | Receives region context and returns a CSS color when the record has no explicit `color` |
| `onRegionClick` | none | Called when a region is clicked |
| `onRegionHover` | none | Called once when the pointer enters a different region |

## `Chile2DMap`

Import from `@chile-geo/maps/2d` to exclude Three.js from the dependency graph. `Map2DOptions` adds `pixelRatio`, `strokeColor`, and `strokeWidth` options.

- `canvas`: canvas created inside the container.
- `updateData(dataSeries)`: atomically replaces values and schedules a redraw.
- `selectRegion(regionId)`: selects a known region and returns whether it was found.
- `clearSelection()`: clears the selected region.
- `selectedRegionId`: currently selected public identifier, if any.
- `setVisibleRegions(regionIds?)`: filters rendered and interactive regions; omit IDs to restore all.
- `visibleRegionIds`: visible identifiers in canonical geographic order.
- `destroy()`: cancels drawing, removes listeners and observers, and removes the canvas.

## `Chile3DMap`

Import from `@chile-geo/maps/3d`. The application must provide the `three` peer dependency. `Map3DOptions` adds `maxExtrusionDepth` (default `3`), `enableControls` (default `false`), and `animationMode` (default `auto`).

- `scene`: Three.js scene.
- `camera`: configured perspective camera.
- `renderer`: WebGL renderer attached to the container.
- `mainGroup`: root group named `ChileMainGroup` containing every region.
- `updateData(dataSeries)`: updates mesh metadata, colors, and Z scale without recreating the renderer.
- `selectRegion(regionId)`: selects a known region and returns whether it was found.
- `clearSelection()`: clears the selected region.
- `selectedRegionId`: currently selected public identifier, if any.
- `setVisibleRegions(regionIds?)`: filters rendered and interactive region groups; omit IDs to restore all.
- `visibleRegionIds`: visible identifiers in canonical geographic order.
- `requestRender()`: schedules a frame after direct scene or camera changes.
- `destroy()`: stops animation and disposes controls, geometries, materials, listeners, and renderer.

Each intersectable mesh stores `regionId`, `regionName`, and supplied metric fields in `mesh.userData`.

`auto` renders continuously only for enabled controls when reduced motion is not requested. `on-demand` coalesces repeated updates into one frame. `continuous` is available for applications with their own animated scene content.

Both renderer elements are keyboard-focusable. Arrow keys change the active region; Enter or Space invokes `onRegionClick`. Invalid positive-only numeric options throw `RangeError`. Unknown metric IDs are ignored with a warning, invalid values become zero, and the last duplicate ID wins.

## Lifecycle guidance

Create one map per host element. Reuse it through repeated `updateData` calls. Invoke `destroy` when a route, component, or dashboard widget is unmounted. Do not call methods after destruction.
