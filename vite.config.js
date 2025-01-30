// функция Vite, которая помогает с автодополнением и валидацией типов в конфигурации.
import { defineConfig } from 'vite';
// используется для работы с путями внутри проекта.
import { resolve } from 'path';
// fast-glob — это библиотека для поиска файлов по шаблонам (src/**/*.html и т. д.).
import fg from 'fast-glob';
// для корректного определения пути к файлу конфигурации.
import { fileURLToPath } from 'url';
// для корректного определения пути к файлу конфигурации.
import path, { dirname } from 'path';
// для корректного определения пути к файлу конфигурации.
import { URL } from 'url';

// dotenv загружает переменные окружения из .env.local.
import dotenv from 'dotenv';

// Подключается vite-plugin-handlebars для работы с шаблонами.
import handlebars from 'vite-plugin-handlebars';
// Handlebars импортируется отдельно для регистрации кастомных хелперов.
import Handlebars from 'handlebars';
// Подключается vite-plugin-image-optimizer для сжатия изображений.
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
// проверяет стили на ошибки.
import stylelintPlugin from 'vite-plugin-stylelint';
// добавляет вендорные префиксы в CSS.
import autoprefixer from 'autoprefixer';
// копирует статические файлы.
import { viteStaticCopy } from 'vite-plugin-static-copy';

// Импортируются данные (context и home), которые будут передаваться в Handlebars.
import { context } from './src/stores/context';
import { home } from './src/stores/home';

// хелпер 'eq' для сравнивания двух значений, так как HB не поддерживает операторы (===, !==, >, < и т. д.) внутри {{#if}}.
Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

// Получение пути к текущему файлу конфигурации.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Загрузка .env.local.
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

// Объект pageData содержит данные для Handlebars-шаблонов.
const pageData = {
  '/index.html': home,
};

export default defineConfig({
  // Указывается, что код компилируется для ES2016+ (поддержка async/await).
  target: ['es2016'],

  // Устанавливается алиас @ → src, чтобы писать import ... from '@/components'.
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  // src задается как корневая папка.
  root: resolve(__dirname, 'src'),

  // publicDir указывает, что публичные файлы лежат в src/assets.
  publicDir: resolve(__dirname, 'src/assets'),

  // host: '0.0.0.0' делает сервер доступным извне.
  // hot: true включает горячую перезагрузку (HMR).
  server: {
    host: '0.0.0.0',
    hot: true,
  },
  // minifyIdentifiers: false отключает минимизацию имен переменных.
  esbuild: {
    minifyIdentifiers: false,
  },

  // Включены sourcemaps (чтобы легче отлаживать стили).
  // Используется Autoprefixer.
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [autoprefixer()],
    },
  },

  plugins: [
    //  partialDirectory — подключает Handlebars-паршалы (src/components).
    // context(pagePath) — передает данные в Handlebars-шаблоны.
    handlebars({
      partialDirectory: resolve(__dirname, './src/components'),
      context(pagePath) {
        return { ...pageData[pagePath], ...context };
      },
    }),

    // Копирует JSON-файлы (assets/data/*.json) в папку dist/data.
    viteStaticCopy({
      targets: [{ src: 'assets/data/*.json', dest: 'data' }],
    }),

    // Сжимает PNG, JPEG, WebP, AVIF.
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

    // Проверяет файлы .css и .scss.
    // Показывает ошибки и предупреждения.
    stylelintPlugin({
      files: ['src/**/*.css', 'src/**/*.scss'],
      fix: false,
      emitError: true,
      emitWarning: true,
    }),
  ],

  //   cssCodeSplit: false — все стили собираются в один файл.
  // minify: false — отключена минимизация.
  // sourcemap: 'inline' — встраивание sourcemaps.
  // emptyOutDir: true — очищает dist перед сборкой.
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
      // Использует fast-glob(fg), чтобы найти все .html файлы и добавить их в сборку.
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
        // Все CSS-файлы объединяются в styles/style.css.
        // JavaScript-файлы идут в js/[name].js.
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
