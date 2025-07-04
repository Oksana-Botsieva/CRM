import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'url';

import path, { dirname } from 'path';
import stylelintPlugin from 'vite-plugin-stylelint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: resolve(__dirname, 'src'),
  base: '/',

  target: ['es2020'],

  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    devSourcemap: true,
  },

  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, './src/components'),
    }),
    stylelintPlugin({
      files: ['src/**/*.css', 'src/**/*.scss'],
      fix: false,
      emitError: true,
      emitWarning: true,
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  server: {
    host: true, // чтобы сервер был доступен по IP
    port: 3050,
    open: true,
  },

  build: {
    cssCodeSplit: false, // Если отключено, все CSS во всём проекте будут извлечены в один CSS файл.(vite-docs)
    minify: false, // минификация
    sourcemap: 'inline', // Если 'inline', то sourcemap будет добавлен в финальный output файл как data(vite-docs)
    outDir: '../dist', // По умолчанию, Vite будет очищать outDir при сборке build, если он внутри корня проекта.(vite-docs) путь
    emptyOutDir: true, //По умолчанию, Vite будет очищать outDir при сборке build, если он внутри корня проекта. (vite-docs)
    // assetsInlineLimit: 0, // это значит никакие ассеты не будут встраиваться, все будут отдельными файлами.

    //Если поставить polyfill: false, Vite не будет добавлять полифилл для старых браузеров, у которых нет поддержки <link rel="modulepreload">
    modulePreload: {
      polyfill: false,
    },

    rollupOptions: {
      // input: Object.fromEntries(
      //   fg
      //     .sync('src/**/*.html') // 1. Найти все HTML-файлы в папке src и её подпапках
      //     // 2. Для каждого файла создать пару [ключ, значение]
      //     .map((file) => [
      //       // 3. Ключ — путь к файлу относительно папки src без расширения
      //       path.relative('src', file.slice(0, file.length - path.extname(file).length)),
      //       fileURLToPath(new URL(file, import.meta.url)), // 4. Значение — абсолютный путь к файлу (с учётом URL-модуля)
      //     ]),
      // ),
      input: {
        // main: path.resolve(__dirname, 'src/js/main.js'),
        main: path.resolve(__dirname, 'src/index.html'),
      },
      output: {
        //как будут называться и где размещаться сгенерированные файлы после билда.
        compact: false, // уменьшает количество пробелов и переносов строк в генерируемом коде
        entryFileNames: 'js/[name].js', //Имя для основных точек входа (entry points, например, главный JS-файл для каждой страницы).

        assetFileNames: (assetInfo) => {
          //Функция для имен файлов ассетов (картинки, шрифты, CSS).
          if (assetInfo.name.endsWith('.css')) {
            return 'styles/style.css';
          }
          return 'assets/[name][extname]';
        },
        chunkFileNames: 'js/[name].js', //Имя для чанков — частей кода, которые Rollup выделяет отдельно для оптимизации (например, общий код между разными точками входа
      },
    },
  },
});
