import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const source = process.argv[2] ?? join(import.meta.dir, '../packages/data-geojson/dist/regions.geojson');
const target = join(import.meta.dir, '../packages/map-render/src/assets/chile-topography.json');
const metadataTarget = join(import.meta.dir, '../packages/map-render/src/assets/chile-topography.meta.json');
const isoByCode: Record<string, string> = {
  '1': 'CL-TA', '2': 'CL-AN', '3': 'CL-AT', '4': 'CL-CO', '5': 'CL-VS', '6': 'CL-LI',
  '7': 'CL-ML', '8': 'CL-BI', '9': 'CL-AR', '10': 'CL-LL', '11': 'CL-AI', '12': 'CL-MA',
  '13': 'CL-RM', '14': 'CL-LR', '15': 'CL-AP', '16': 'CL-NB',
};
const nameByIso: Record<string, string> = {
  'CL-AI': 'Aysén Region',
  'CL-AN': 'Antofagasta Region',
  'CL-AP': 'Arica and Parinacota Region',
  'CL-AR': 'Araucanía Region',
  'CL-AT': 'Atacama Region',
  'CL-BI': 'Biobío Region',
  'CL-CO': 'Coquimbo Region',
  'CL-LI': "O'Higgins Region",
  'CL-LL': 'Los Lagos Region',
  'CL-LR': 'Los Ríos Region',
  'CL-MA': 'Magallanes and Chilean Antarctica Region',
  'CL-ML': 'Maule Region',
  'CL-NB': 'Ñuble Region',
  'CL-RM': 'Santiago Metropolitan Region',
  'CL-TA': 'Tarapacá Region',
  'CL-VS': 'Valparaíso Region',
};

interface RawFeatureCollection {
  type: 'FeatureCollection';
  features: Array<{ properties: { id: number | string; name: string }; geometry: unknown }>;
}

const input = await Bun.file(source).json() as RawFeatureCollection;
const output = {
  type: 'FeatureCollection',
  features: input.features.filter((feature) => String(feature.properties.id) !== '0').map((feature) => {
    const id = isoByCode[String(feature.properties.id)] ?? `CL-${feature.properties.id}`;
    return {
      type: 'Feature',
      properties: { id, name: nameByIso[id] ?? feature.properties.name },
      geometry: feature.geometry,
    };
  }),
};

await mkdir(dirname(target), { recursive: true });
const serialized = JSON.stringify(output);
await Bun.write(target, serialized);
await Bun.write(metadataTarget, `${JSON.stringify({
  source: 'Biblioteca del Congreso Nacional de Chile (BCN)',
  sourceSnapshotDate: '2026-08-31',
  coordinateReferenceSystem: 'WGS84',
  coordinatePrecision: 4,
  featureCount: output.features.length,
  sha256: new Bun.CryptoHasher('sha256').update(serialized).digest('hex'),
}, null, 2)}\n`);
console.log(`Wrote ${output.features.length} regions to ${target}`);
