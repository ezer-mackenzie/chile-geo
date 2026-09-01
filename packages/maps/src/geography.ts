import regions from './assets/chile-topography.json';
import metadata from './assets/chile-topography.meta.json';
import type { RegionFeatureCollection } from './types/index.js';

export interface ChileGeographyMetadata {
  readonly source: string;
  readonly sourceSnapshotDate: string;
  readonly coordinateReferenceSystem: 'WGS84';
  readonly coordinatePrecision: number;
  readonly featureCount: number;
  readonly sha256: string;
}

export interface ChileGeographicBounds {
  readonly minLongitude: number;
  readonly minLatitude: number;
  readonly maxLongitude: number;
  readonly maxLatitude: number;
}

export interface ChileGeographicPoint {
  readonly longitude: number;
  readonly latitude: number;
}

const geography = regions as RegionFeatureCollection;

/** Metadata for the exact bundled BCN-derived geographic snapshot. */
export const CHILE_GEOGRAPHY_METADATA = Object.freeze(metadata) as ChileGeographyMetadata;

/** Returns an independent GeoJSON copy so consumers cannot mutate renderer state. */
export function getChileRegionsGeoJSON(): RegionFeatureCollection {
  return structuredClone(geography);
}

/** Returns an independent regional feature, or undefined for an unknown ID. */
export function getChileRegionFeature(regionId: string): RegionFeatureCollection['features'][number] | undefined {
  const feature = geography.features.find((candidate) => candidate.properties.id === regionId);
  return feature ? structuredClone(feature) : undefined;
}

/** Returns the WGS84 extent of one region, or undefined for an unknown ID. */
export function getChileRegionBounds(regionId: string): ChileGeographicBounds | undefined {
  const feature = geography.features.find((candidate) => candidate.properties.id === regionId);
  if (!feature) return undefined;

  let minLongitude = Infinity;
  let minLatitude = Infinity;
  let maxLongitude = -Infinity;
  let maxLatitude = -Infinity;
  const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
  for (const polygon of polygons) for (const ring of polygon) for (const [longitude, latitude] of ring) {
    minLongitude = Math.min(minLongitude, longitude);
    minLatitude = Math.min(minLatitude, latitude);
    maxLongitude = Math.max(maxLongitude, longitude);
    maxLatitude = Math.max(maxLatitude, latitude);
  }
  return { minLongitude, minLatitude, maxLongitude, maxLatitude };
}

/** Returns the center of a region's geographic extent; this is not a polygon centroid. */
export function getChileRegionCenter(regionId: string): ChileGeographicPoint | undefined {
  const bounds = getChileRegionBounds(regionId);
  return bounds ? {
    longitude: (bounds.minLongitude + bounds.maxLongitude) / 2,
    latitude: (bounds.minLatitude + bounds.maxLatitude) / 2,
  } : undefined;
}
