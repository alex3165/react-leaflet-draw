/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';

import { defineConfig } from 'vite';

export default defineConfig(() => ({
  build: {
    target: ['safari11.1', 'chrome64', 'firefox66', 'edge88'],
    outDir: resolve(__dirname, './dist'),
    input: { main: resolve(__dirname, 'index.html') },
    assetsDir: '',
    emptyOutDir: true,
  },
  server: {
    host: '0.0.0.0',
    open: true,
    port: 8002,
  },
}));
