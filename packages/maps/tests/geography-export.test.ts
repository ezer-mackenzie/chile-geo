import { describe, expect, test } from 'bun:test';
import {
  CHILE_GEOGRAPHY_METADATA,
  getChileRegionBounds,
  getChileRegionCenter,
  getChileRegionFeature,
  getChileRegionsGeoJSON,
} from '../src/geography';

describe('public geography export', () => {
  test('returns the documented snapshot and an independent copy', () => {
    const first = getChileRegionsGeoJSON();
    const second = getChileRegionsGeoJSON();

    expect(first.features).toHaveLength(16);
    expect(first.features).not.toBe(second.features);
    expect(CHILE_GEOGRAPHY_METADATA.featureCount).toBe(first.features.length);
    expect(CHILE_GEOGRAPHY_METADATA.coordinateReferenceSystem).toBe('WGS84');
    expect(CHILE_GEOGRAPHY_METADATA.sha256).toMatch(/^[a-f0-9]{64}$/);

    first.features.pop();
    expect(second.features).toHaveLength(16);
  });

  test('queries independent features, bounds, and extent centers by ID', () => {
    const feature = getChileRegionFeature('CL-RM');
    const bounds = getChileRegionBounds('CL-RM');
    const center = getChileRegionCenter('CL-RM');

    expect(feature?.properties.id).toBe('CL-RM');
    expect(bounds).toBeDefined();
    expect(center).toBeDefined();
    expect(center!.longitude).toBeGreaterThan(bounds!.minLongitude);
    expect(center!.longitude).toBeLessThan(bounds!.maxLongitude);
    expect(center!.latitude).toBeGreaterThan(bounds!.minLatitude);
    expect(center!.latitude).toBeLessThan(bounds!.maxLatitude);
    expect(getChileRegionFeature('CL-UNKNOWN')).toBeUndefined();
    expect(getChileRegionBounds('CL-UNKNOWN')).toBeUndefined();
    expect(getChileRegionCenter('CL-UNKNOWN')).toBeUndefined();

    feature!.properties.name = 'Changed by consumer';
    expect(getChileRegionFeature('CL-RM')?.properties.name).toBe('Santiago Metropolitan Region');
  });
});
