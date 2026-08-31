# API reference

## `RegionData`

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Region identifier, such as `CL-RM` or `CL-VS` |
| `name` | `string` | Consumer-provided display name for the metric |
| `value` | `number` | Metric used for color and extrusion normalization |
| `color` | `string?` | Optional CSS color override |

Rendering and callbacks match records by `id`. The bundled geographic name is passed as the first callback argument; the matching consumer record is passed as the second argument.

## `BaseMapOptions`

| Option | Default | Description |
| --- | --- | --- |
| `container` | required | Host element that owns the renderer |
| `defaultColor` | `#94a3b8` | Fill used when no positive metric is available |
| `onRegionClick` | none | Called when a region is clicked |
| `onRegionHover` | none | Called once when the pointer enters a different region |

## `Chile2DMap`

Import from `@chile-geo/maps/2d` to exclude Three.js from the dependency graph. `Map2DOptions` adds `pixelRatio`, `strokeColor`, and `strokeWidth` options.

- `canvas`: canvas created inside the container.
- `updateData(dataSeries)`: atomically replaces values and schedules a redraw.
- `destroy()`: cancels drawing, removes listeners and observers, and removes the canvas.

## `Chile3DMap`

Import from `@chile-geo/maps/3d`. The application must provide the `three` peer dependency. `Map3DOptions` adds `maxExtrusionDepth` (default `3`) and `enableControls` (default `false`).

- `scene`: Three.js scene.
- `camera`: configured perspective camera.
- `renderer`: WebGL renderer attached to the container.
- `mainGroup`: root group named `ChileMainGroup` containing every region.
- `updateData(dataSeries)`: updates mesh metadata, colors, and Z scale without recreating the renderer.
- `destroy()`: stops animation and disposes controls, geometries, materials, listeners, and renderer.

Each intersectable mesh stores `regionId`, `regionName`, and supplied metric fields in `mesh.userData`.

## Lifecycle guidance

Create one map per host element. Reuse it through repeated `updateData` calls. Invoke `destroy` when a route, component, or dashboard widget is unmounted. Do not call methods after destruction.
