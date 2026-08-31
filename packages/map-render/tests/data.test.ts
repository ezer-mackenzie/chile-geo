import { describe, expect, mock, test } from 'bun:test';
import topography from '../src/assets/chile-topography.json';
import type { RegionFeatureCollection } from '../src/types';
import { finiteNonNegativeOption, finitePositiveOption, prepareDataSeries } from '../src/maps/data';

const geography = topography as RegionFeatureCollection;

describe('metric preparation', () => {
  test('normalizes invalid values, ignores unknown IDs, and lets the last duplicate win', () => {
    const warning = mock(() => undefined);
    const originalWarning = console.warn;
    console.warn = warning;
    try {
      const result = prepareDataSeries([
        { id: 'CL-RM', name: 'First', value: 2 },
        { id: 'UNKNOWN', name: 'Unknown', value: 100 },
        { id: 'CL-RM', name: 'Last', value: Number.NaN },
        { id: 'CL-VS', name: 'Negative', value: -10 },
      ], geography);
      expect(result.byId.size).toBe(2);
      expect(result.byId.get('CL-RM')).toEqual({ id: 'CL-RM', name: 'Last', value: 0 });
      expect(result.byId.get('CL-VS')?.value).toBe(0);
      expect(result.maximum).toBe(0);
      expect(warning).toHaveBeenCalledTimes(2);
    } finally {
      console.warn = originalWarning;
    }
  });
});

describe('numeric options', () => {
  test('accepts valid values and rejects unsafe values', () => {
    expect(finitePositiveOption(undefined, 2, 'value')).toBe(2);
    expect(finiteNonNegativeOption(0, 1, 'value')).toBe(0);
    expect(() => finitePositiveOption(0, 1, 'value')).toThrow(RangeError);
    expect(() => finiteNonNegativeOption(-1, 1, 'value')).toThrow(RangeError);
  });
});
