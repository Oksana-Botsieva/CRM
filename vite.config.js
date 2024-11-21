import { defineConfig } from 'vite';
import { resolve } from 'path';
import fg from 'fast-glob';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { URL } from 'url';

import dotenv from 'dotenv';

import handlebars from 'vite-plugin-handlebars';
import Handlebars from 'handlebars';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import stylelintPlugin from 'vite-plugin-stylelint';
import autoprefixer from 'autoprefixer';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { context } from './src/stores/context';
import { home } from './src/stores/home';

Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const pageData = {
  '/index.html': home,
};

export default defineConfig({
  target: ['es2016'],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  root: resolve(__dirname, 'src'),

  publicDir: resolve(__dirname, 'src/assets'),

  server: {
    host: '0.0.0.0',
    hot: true,
  },

  esbuild: {
    minifyIdentifiers: false,
  },

  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixer()],
    },
  },

  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, './src/components'),
      context(pagePath) {
        return { ...pageData[pagePath], ...context };
      },
    }),

    viteStaticCopy({
      targets: [{ src: 'assets/data/*.json', dest: 'data' }],
    }),

    ViteImageOptimizer({
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 80,
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
      },
      tiff: {
        // https://sharp.pixelplumbing.com/api-output#tiff
        quality: 80,
      },
      // gif does not support lossless compression
      // https://sharp.pixelplumbing.com/api-output#gif
      gif: {},
      webp: {
        // https://sharp.pixelplumbing.com/api-output#webp
        quality: 76,
      },
      avif: {
        // https://sharp.pixelplumbing.com/api-output#avif
        lossless: true,
      },
    }),

    stylelintPlugin({
      files: ['src/**/*.css', 'src/**/*.scss'],
      fix: false,
      emitError: true,
      emitWarning: true,
    }),
  ],

  build: {
    cssCodeSplit: false,
    minify: false,
    sourcemap: 'inline',
    outDir: '../dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      input: Object.fromEntries(
        fg
          .sync('src/**/*.html')
          .map((file) => [
            path.relative('src', file.slice(0, file.length - path.extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      output: {
        compact: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'styles/style.css';
          }

          return 'assets/[name][extname]';
        },
        chunkFileNames: 'js/[name].js',
      },
    },
  },
});
