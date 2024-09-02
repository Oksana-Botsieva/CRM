import { defineConfig } from 'vite';
import { resolve } from 'path';
import fg from 'fast-glob';
import { fileURLToPath } from 'url';
import path from 'node:path';
import handlebars from 'vite-plugin-handlebars';

import { context } from './src/stores/context';
import { home } from './src/stores/home';

const pageData = {
  '/index.html': home,
};

export default defineConfig({
  target: ['es2015'],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  root: resolve(__dirname, 'src'),

  server: {
    host: '0.0.0.0',
    hot: true,
  },

  esbuild: {
    minifyIdentifiers: false, // Отключаем замену идентификаторов
  },

  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, './src/components'),
      context(pagePath) {
        return { ...pageData[pagePath], ...context };
      },
    }),
  ],

  build: {
    minify: false,
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        fg
          .sync('src/**/*.html')
          .map((file) => [
            path.relative(
              'src',
              file.slice(0, file.length - path.extname(file).length),
            ),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        compact: true,
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          if (/webp|jpg|jpeg|svg|gif|tiff|png|ico/i.test(extType)) {
            extType = 'images';
          } else if (/woff|woff2/.test(extType)) {
            extType = 'fonts';
          } else if (/svg/.test(extType)) {
            extType = 'svg';
          }
          return extType !== 'css'
            ? `${extType}/[name][extname]`
            : `${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
  },
});
