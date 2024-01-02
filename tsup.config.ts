import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/**/*.ts'],
  sourcemap: false,
  clean: true,
  format: 'cjs',
  target: 'es2019',
  minify: false,
  platform: 'node',
  outDir: 'dist',
  bundle: false,
  dts: true
});
