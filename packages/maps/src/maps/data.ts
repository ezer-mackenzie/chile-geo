import type { RegionData, RegionFeatureCollection } from '../types/index.js';

export interface PreparedData {
  byId: Map<string, RegionData>;
  maximum: number;
}

export function prepareDataSeries(dataSeries: readonly RegionData[], geography: RegionFeatureCollection): PreparedData {
  const knownIds = new Set(geography.features.map((feature) => feature.properties.id));
  const byId = new Map<string, RegionData>();
  for (const item of dataSeries) {
    if (!knownIds.has(item.id)) {
      console.warn(`[Chile Geo] Ignoring unknown region ID: ${item.id}`);
      continue;
    }
    if (byId.has(item.id)) console.warn(`[Chile Geo] Duplicate region ID ${item.id}; the last record wins.`);
    byId.set(item.id, { ...item, value: Number.isFinite(item.value) ? Math.max(0, item.value) : 0 });
  }
  return { byId, maximum: Math.max(0, ...[...byId.values()].map((item) => item.value)) };
}

export function finitePositiveOption(value: number | undefined, fallback: number, name: string): number {
  const resolved = value ?? fallback;
  if (!Number.isFinite(resolved) || resolved <= 0) throw new RangeError(`${name} must be a finite number greater than zero.`);
  return resolved;
}

export function finiteNonNegativeOption(value: number | undefined, fallback: number, name: string): number {
  const resolved = value ?? fallback;
  if (!Number.isFinite(resolved) || resolved < 0) throw new RangeError(`${name} must be a finite non-negative number.`);
  return resolved;
}
