const workspace = new URL('../', import.meta.url);
const mapsPath = await Bun.file(new URL('packages/maps/package.json', workspace)).exists()
  ? 'packages/maps/package.json'
  : 'packages/map-render/package.json';
const files = [
  'package.json',
  mapsPath,
  'packages/data-geojson/package.json',
  'packages/data-topojson/package.json',
];

const manifests = await Promise.all(files.map(async (path) => ({
  path,
  manifest: await Bun.file(new URL(path, workspace)).json() as { name: string; version: string; private?: boolean },
})));
const maps = manifests.find(({ path }) => path === mapsPath)!.manifest;
const expectedTag = `v${maps.version}`;
const releaseTag = process.env['GITHUB_REF_NAME'] ?? process.env['RELEASE_TAG'];

if (releaseTag !== expectedTag) throw new Error(`Release tag ${releaseTag ?? '(missing)'} must exactly match ${expectedTag}.`);
for (const { path, manifest } of manifests) {
  if (manifest.version !== maps.version) throw new Error(`${path} is ${manifest.version}; expected ${maps.version}.`);
}
if (maps.name !== '@chile-geo/maps') throw new Error(`Unexpected publishable package name: ${maps.name}.`);
if (maps.private) throw new Error('@chile-geo/maps must not be private.');

const changelog = await Bun.file(new URL('CHANGELOG.md', workspace)).text();
if (!changelog.includes(`## [${maps.version}]`)) throw new Error(`CHANGELOG.md has no ${maps.version} release entry.`);

console.log(`Release contract verified for ${maps.name}@${maps.version} (${expectedTag}).`);
