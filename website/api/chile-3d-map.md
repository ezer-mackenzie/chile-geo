# `Chile3DMap`

Constructor: `new Chile3DMap(options: Map3DOptions)`.

Public API:

- `readonly scene: THREE.Scene`
- `readonly camera: THREE.PerspectiveCamera`
- `readonly renderer: THREE.WebGLRenderer`
- `readonly mainGroup: THREE.Group`
- `updateData(dataSeries: RegionData[]): void`
- `selectRegion(regionId: string): boolean`
- `clearSelection(): void`
- `readonly selectedRegionId: string | undefined`
- `destroy(): void`

`mainGroup` is named `ChileMainGroup` and contains one group per region. Intersectable meshes store `regionId`, `regionName`, and metric fields in `userData`. Default maximum extrusion depth is `3`; controls are disabled by default. Selection uses an emissive highlight and can be customized with `selectedColor`.
