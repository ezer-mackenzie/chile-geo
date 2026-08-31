import { mkdtemp, mkdir, readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const workspace = join(import.meta.dir, '..');
const packageDirectory = join(workspace, 'packages/map-render');
const temporary = await mkdtemp(join(tmpdir(), 'chile-geo-package-'));

async function run(command: string[], cwd = workspace): Promise<string> {
  const child = Bun.spawn(command, { cwd, stdout: 'pipe', stderr: 'pipe', env: { ...process.env, TMPDIR: tmpdir(), BUN_TMPDIR: tmpdir() } });
  const [exitCode, stdout, stderr] = await Promise.all([child.exited, new Response(child.stdout).text(), new Response(child.stderr).text()]);
  if (exitCode !== 0) throw new Error(`${command.join(' ')} failed:\n${stdout}${stderr}`);
  if (stdout.trim()) console.log(stdout.trim());
  return stdout;
}

try {
  await run(['bun', 'pm', 'pack', '--destination', temporary], packageDirectory);
  const archiveName = (await readdir(temporary)).find((file) => file.endsWith('.tgz'));
  if (!archiveName) throw new Error('Package archive was not created.');
  const tarball = join(temporary, archiveName);
  await run(['bunx', 'publint', 'run', tarball, '--strict']);
  await run(['bunx', 'attw', tarball, '--profile', 'esm-only', '--summary']);
  const listing = await run(['tar', '-tzf', tarball]);
  for (const required of ['package/package.json', 'package/dist/index.js', 'package/dist/2d.js', 'package/dist/3d.js', 'package/dist/index.d.ts']) {
    if (!listing.split('\n').includes(required)) throw new Error(`Packed package is missing ${required}.`);
  }

  const consumer = join(temporary, 'consumer');
  await mkdir(consumer);
  await Bun.write(join(consumer, 'package.json'), JSON.stringify({
    name: 'chile-geo-consumer-test', private: true, type: 'module',
    dependencies: { '@chile-geo/maps': `file:${tarball}`, three: process.env['THREE_VERSION'] ?? '^0.185.1' },
    devDependencies: { typescript: '^5.9.3', vite: '^8.2.2' },
  }));
  await Bun.write(join(consumer, 'tsconfig.json'), JSON.stringify({ compilerOptions: {
    strict: true, noEmit: true, target: 'ES2022', module: 'ESNext', moduleResolution: 'bundler', lib: ['ES2022', 'DOM'], skipLibCheck: true,
  }, include: ['main.ts'] }));
  await Bun.write(join(consumer, 'main.ts'), `
import { Chile2DMap, type RegionData } from '@chile-geo/maps/2d';
import { Chile3DMap } from '@chile-geo/maps/3d';
const data: RegionData[] = [{ id: 'CL-RM', name: 'Santiago Metropolitan Region', value: 1 }];
declare const container: HTMLElement;
new Chile2DMap({ container }).updateData(data);
new Chile3DMap({ container }).updateData(data);
`);
  await Bun.write(join(consumer, 'index.html'), '<div id="app"></div><script type="module" src="/main.ts"></script>');
  await run(['bun', 'install'], consumer);
  await run(['bunx', 'tsc', '--noEmit', '-p', 'tsconfig.json'], consumer);
  await run(['bunx', 'vite', 'build'], consumer);
  console.log('Packed package installs, type-checks, and bundles in a clean consumer.');
} finally {
  await rm(temporary, { recursive: true, force: true });
}
