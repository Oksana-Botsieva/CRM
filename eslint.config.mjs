// import js from '@eslint/js';
// import globals from 'globals';

// /** @type {import("eslint").Linter.FlatConfig[]} */
// export default [
//   {
//     languageOptions: {
//       sourceType: 'module', // Используем ECMAScript модули (ESM)
//       globals: {
//         ...globals.browser, // Глобальные переменные браузера
//         ...globals.node, // Глобальные переменные Node.js
//       },
//     },
//     rules: {
//       semi: ['error', 'always'], // Всегда использовать точки с запятой
//       quotes: ['error', 'double'], // Двойные кавычки
//       'no-unused-vars': 'warn', // Предупреждение о неиспользуемых переменных
//       'no-console': 'warn', // Разрешаем `console.log`
//     },
//   },
//   js.configs.recommended, // Встроенные правила JavaScript
// ];

import js from '@eslint/js';
import globals from 'globals';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  js.configs.recommended,
  includeIgnoreFile(path.resolve(__dirname, '.gitignore')),
  {
    files: ['src/**/*', 'deploy.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-console': ['warn'],
      eqeqeq: ['error', 'always'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-constant-binary-expression': 'off',
    },
  },
];
