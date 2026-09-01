import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const dist = join(import.meta.dir, '../packages/map-render/dist');
const files = await readdir(dist);
const budgets = [
  { label: '2D renderer', prefix: 'Chile2DMap-', maximumGzipBytes: 2_000 },
  { label: '3D renderer', prefix: 'Chile3DMap-', maximumGzipBytes: 8_000 },
  { label: 'region metadata', exact: 'regions.js', maximumGzipBytes: 1_000 },
  { label: 'geographic asset chunk', prefix: 'geometry-', maximumGzipBytes: 90_000 },
  { label: 'UMD bundle', exact: 'index.umd.cjs', maximumGzipBytes: 90_000 },
];

for (const budget of budgets) {
  const fileName = budget.exact ?? files.find((file) => file.startsWith(budget.prefix!));
  if (!fileName) throw new Error(`Could not find the ${budget.label} build artifact.`);
  const bytes = new Uint8Array(await Bun.file(join(dist, fileName)).arrayBuffer());
  const compressed = Bun.gzipSync(bytes).byteLength;
  if (compressed > budget.maximumGzipBytes) {
    throw new Error(`${budget.label} is ${compressed} gzip bytes; budget is ${budget.maximumGzipBytes}.`);
  }
  console.log(`${budget.label}: ${compressed}/${budget.maximumGzipBytes} gzip bytes`);
}

const twoDimensionalFiles = files.filter((file) => file === '2d.js' || file.startsWith('Chile2DMap-') || file.startsWith('geometry-'));
for (const file of twoDimensionalFiles) {
  const contents = await Bun.file(join(dist, file)).text();
  if (/from\s*["']three|OrbitControls|WebGLRenderer/.test(contents)) throw new Error(`2D artifact ${file} contains Three.js code.`);
}
console.log('2D artifacts contain no Three.js imports or renderer code.');
