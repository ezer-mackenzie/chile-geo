# `Chile2DMap`

Constructor: `new Chile2DMap(options: Map2DOptions)`.

Public API:

- `readonly canvas: HTMLCanvasElement`
- `updateData(dataSeries: RegionData[]): void`
- `selectRegion(regionId: string): boolean`
- `clearSelection(): void`
- `readonly selectedRegionId: string | undefined`
- `destroy(): void`

The constructor throws when the container is missing, Canvas 2D is unavailable, or a numeric option is invalid. Default color is `#94a3b8`, stroke color is white, stroke width is `0.75`, and pixel ratio defaults to the device ratio with a maximum of `3`. Selection uses a dark outline by default and can be customized with `selectedColor`.
