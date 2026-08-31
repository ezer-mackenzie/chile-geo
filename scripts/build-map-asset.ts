import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const source = process.argv[2] ?? join(import.meta.dir, '../packages/data-geojson/dist/regions.geojson');
const target = join(import.meta.dir, '../packages/map-render/src/assets/chile-topography.json');
const isoByCode: Record<string, string> = {
  '1': 'CL-TA', '2': 'CL-AN', '3': 'CL-AT', '4': 'CL-CO', '5': 'CL-VS', '6': 'CL-LI',
  '7': 'CL-ML', '8': 'CL-BI', '9': 'CL-AR', '10': 'CL-LL', '11': 'CL-AI', '12': 'CL-MA',
  '13': 'CL-RM', '14': 'CL-LR', '15': 'CL-AP', '16': 'CL-NB',
};

interface RawFeatureCollection {
  type: 'FeatureCollection';
  features: Array<{ properties: { id: number | string; name: string }; geometry: unknown }>;
}

const input = await Bun.file(source).json() as RawFeatureCollection;
const output = {
  type: 'FeatureCollection',
  features: input.features.filter((feature) => String(feature.properties.id) !== '0').map((feature) => ({
    type: 'Feature',
    properties: {
      id: isoByCode[String(feature.properties.id)] ?? `CL-${feature.properties.id}`,
      name: feature.properties.name,
    },
    geometry: feature.geometry,
  })),
};

await mkdir(dirname(target), { recursive: true });
await Bun.write(target, JSON.stringify(output));
console.log(`Wrote ${output.features.length} regions to ${target}`);
