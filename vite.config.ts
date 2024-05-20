import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { comlink } from "vite-plugin-comlink";
//import { replaceCodePlugin } from 'vite-plugin-replace';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './@'),
      /*
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    zlib: require.resolve("browserify-zlib"),
    assert: require.resolve("assert/"),
    crypto: require.resolve("crypto-browserify"),
     
      process: 'process/browser',
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      assert: 'assert',
       */
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    target: 'esnext',
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  worker: {
    format: 'es',
  },
});
