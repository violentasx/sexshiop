import { defineConfig } from 'vite';

/** GitHub Pages: https://<user>.github.io/sexshiop/ – build naudoja /sexshiop/ bazę */
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/sexshiop/' : '/',
  root: '.',
  server: { port: 5173, open: true },
}));
