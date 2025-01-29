import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config} */
export default {
  root: true, // Это указывает ESLint, что это основной конфигурационный файл
  parserOptions: {
    ecmaVersion: 2020, // Версия ECMAScript
    sourceType: 'module', // Для использования import/export
  },
  env: {
    browser: true, // Включение глобальных переменных для браузера
    node: true, // Включение глобальных переменных для Node.js
  },
  globals: globals.browser, // Глобальные переменные для браузера
  extends: [
    'eslint:recommended', // Базовые правила ESLint
    'plugin:prettier/recommended', // Подключаем Prettier
  ],
  rules: {
    semi: ['error', 'always'], // Требование точек с запятой
    quotes: ['error', 'single'], // Использование одинарных кавычек
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        'no-console': 'warn', // Предупреждения о console.log
      },
    },
  ],
};
