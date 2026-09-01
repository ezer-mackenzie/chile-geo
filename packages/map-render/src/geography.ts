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

const geography = regions as RegionFeatureCollection;

/** Metadata for the exact bundled BCN-derived geographic snapshot. */
export const CHILE_GEOGRAPHY_METADATA = Object.freeze(metadata) as ChileGeographyMetadata;

/** Returns an independent GeoJSON copy so consumers cannot mutate renderer state. */
export function getChileRegionsGeoJSON(): RegionFeatureCollection {
  return structuredClone(geography);
}
