import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        URL: 'readonly',
      },
    },
    rules: {
      'no-console': ['warn'],
      eqeqeq: ['error', 'always'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
];
