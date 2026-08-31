import { describe, expect, test } from 'bun:test';
import topography from '../src/assets/chile-topography.json';
import type { RegionFeatureCollection } from '../src/types';
import { createViewportTransform, getBounds, metricColor, normalizedValue, polygonsOf, project } from '../src/maps/geometry';

const geography = topography as RegionFeatureCollection;

describe('bundled geography', () => {
  test('contains every Chilean region with ISO-like identifiers', () => {
    expect(geography.features).toHaveLength(16);
    expect(new Set(geography.features.map(({ properties }) => properties.id)).size).toBe(16);
    for (const feature of geography.features) {
      expect(feature.properties.id).toMatch(/^CL-[A-Z]{2}$/);
      expect(feature.properties.name.length).toBeGreaterThan(0);
      expect(feature.properties.name.endsWith('Region')).toBe(true);
      expect(polygonsOf(feature).length).toBeGreaterThan(0);
    }
  });

  test('keeps coordinate precision at four decimal places or fewer', () => {
    for (const feature of geography.features) for (const polygon of polygonsOf(feature)) for (const ring of polygon) {
      for (const coordinate of ring.flat()) expect(String(coordinate).split('.')[1]?.length ?? 0).toBeLessThanOrEqual(4);
    }
  });
});

describe('rendering helpers', () => {
  test('fits the geographic bounds inside the viewport', () => {
    const bounds = getBounds(geography);
    const transform = createViewportTransform(bounds, 800, 600, 10);
    const [left, bottom] = project([bounds.minX, bounds.minY], transform);
    const [right, top] = project([bounds.maxX, bounds.maxY], transform);
    expect(left).toBeGreaterThanOrEqual(9.99);
    expect(right).toBeLessThanOrEqual(790.01);
    expect(top).toBeGreaterThanOrEqual(9.99);
    expect(bottom).toBeLessThanOrEqual(590.01);
  });

  test('clamps normalized metrics and generates a fallback color', () => {
    expect(normalizedValue(-2, 10)).toBe(0);
    expect(normalizedValue(5, 10)).toBe(0.5);
    expect(metricColor(0, 0, '#abc')).toBe('#abc');
    expect(metricColor(10, 10, '#abc')).toMatch(/^hsl\(/);
  });
});
