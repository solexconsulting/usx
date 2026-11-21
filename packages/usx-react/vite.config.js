import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { NodePackageImporter } from 'sass';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        importers: [new NodePackageImporter()],
      },
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.js'),
        chat: resolve(__dirname, 'src/chat.js'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      // Exclude peer dependencies from the bundle.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    // Don't minify the library build so consumers can inspect it.
    minify: false,
  },
});
