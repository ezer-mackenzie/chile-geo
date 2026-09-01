export interface RegionData {
  id: string;
  name: string;
  value: number;
  color?: string;
}

export interface RegionColorContext {
  id: string;
  name: string;
  value: number;
  maximum: number;
  data?: RegionData;
}

export type RegionColorScale = (context: RegionColorContext) => string;

export interface BaseMapOptions {
  container: HTMLElement;
  defaultColor?: string;
  selectedColor?: string;
  colorScale?: RegionColorScale;
  onRegionClick?: (regionName: string, data?: RegionData) => void;
  onRegionHover?: (regionName: string, data?: RegionData) => void;
}

export interface Map3DOptions extends BaseMapOptions {
  maxExtrusionDepth?: number;
  enableControls?: boolean;
  animationMode?: 'auto' | 'continuous' | 'on-demand';
}

export interface Map2DOptions extends BaseMapOptions {
  pixelRatio?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export type Position = [number, number];
export type PolygonCoordinates = Position[][];

export interface RegionFeature {
  type: 'Feature';
  properties: { id: string; name: string };
  geometry: { type: 'Polygon'; coordinates: PolygonCoordinates } | { type: 'MultiPolygon'; coordinates: PolygonCoordinates[] };
}

export interface RegionFeatureCollection {
  type: 'FeatureCollection';
  features: RegionFeature[];
}
