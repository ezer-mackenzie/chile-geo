import { describe, expect, test } from 'bun:test';
import { CHILE_GEOGRAPHY_METADATA, getChileRegionsGeoJSON } from '../src/geography';

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
});
