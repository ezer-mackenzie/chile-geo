import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  const modules = mode === 'modules';
  return {
    plugins: modules ? [dts({ include: ['src'], exclude: ['src/assets/**'], insertTypesEntry: true })] : [],
    build: {
      emptyOutDir: !modules,
      lib: modules ? {
        entry: { index: 'src/index.ts', '2d': 'src/2d.ts', '3d': 'src/3d.ts', regions: 'src/regions.ts', types: 'src/types/index.ts' },
        formats: ['es'],
        fileName: (_format, entryName) => `${entryName}.js`,
      } : {
        entry: 'src/index.ts', formats: ['umd'], name: 'ChileGeo', fileName: () => 'index.umd.cjs',
      },
      rollupOptions: {
        external: ['three'],
        output: { globals: { three: 'THREE' } },
      },
    },
  };
});
