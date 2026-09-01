import { describe, expect, test } from 'bun:test';
import topography from '../src/assets/chile-topography.json';
import { CHILE_REGIONS, isChileRegionId } from '../src/regions';

describe('public region metadata', () => {
  test('matches the bundled geography exactly', () => {
    const publicRegions = [...CHILE_REGIONS].sort((left, right) => left.id.localeCompare(right.id));
    const bundledRegions = topography.features
      .map(({ properties }) => properties)
      .sort((left, right) => left.id.localeCompare(right.id));
    expect(JSON.stringify(publicRegions)).toBe(JSON.stringify(bundledRegions));
  });

  test('provides a type guard for runtime input', () => {
    expect(isChileRegionId('CL-RM')).toBe(true);
    expect(isChileRegionId('CL-UNKNOWN')).toBe(false);
  });
});
