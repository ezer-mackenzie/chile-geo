import type { PolygonCoordinates, Position, RegionFeature, RegionFeatureCollection } from '../types/index.js';

export interface Bounds { minX: number; minY: number; maxX: number; maxY: number }
export interface ViewportTransform { scale: number; offsetX: number; offsetY: number; height: number }

export function polygonsOf(feature: RegionFeature): PolygonCoordinates[] {
  return feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
}

export function getBounds(data: RegionFeatureCollection): Bounds {
  const bounds: Bounds = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  for (const feature of data.features) for (const polygon of polygonsOf(feature)) for (const ring of polygon) {
    for (const [x, y] of ring) {
      bounds.minX = Math.min(bounds.minX, x); bounds.maxX = Math.max(bounds.maxX, x);
      bounds.minY = Math.min(bounds.minY, y); bounds.maxY = Math.max(bounds.maxY, y);
    }
  }
  return bounds;
}

export function createViewportTransform(bounds: Bounds, width: number, height: number, padding = 12): ViewportTransform {
  const availableWidth = Math.max(1, width - padding * 2);
  const availableHeight = Math.max(1, height - padding * 2);
  const scale = Math.min(availableWidth / (bounds.maxX - bounds.minX), availableHeight / (bounds.maxY - bounds.minY));
  const drawnWidth = (bounds.maxX - bounds.minX) * scale;
  const drawnHeight = (bounds.maxY - bounds.minY) * scale;
  return {
    scale,
    offsetX: (width - drawnWidth) / 2 - bounds.minX * scale,
    offsetY: (height - drawnHeight) / 2 + bounds.maxY * scale,
    height,
  };
}

export function project([x, y]: Position, transform: ViewportTransform): Position {
  return [x * transform.scale + transform.offsetX, -y * transform.scale + transform.offsetY];
}

export function normalizedValue(value: number, maximum: number): number {
  if (!Number.isFinite(value) || maximum <= 0) return 0;
  return Math.max(0, value) / maximum;
}

export function metricColor(value: number, maximum: number, fallback: string): string {
  if (maximum <= 0) return fallback;
  const ratio = normalizedValue(value, maximum);
  return `hsl(${Math.round(210 - ratio * 190)}, 72%, ${Math.round(62 - ratio * 16)}%)`;
}
