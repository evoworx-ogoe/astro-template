import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import astroParser from 'astro-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import typeScriptESLintParser from '@typescript-eslint/parser';

const compat = new FlatCompat();

/** @type {import('@eslint/eslint/lib/shared/types').ConfigData} */
export default [
  js.configs.recommended,
  eslintConfigPrettier,
  ...compat.extends('standard-with-typescript', 'plugin:astro/recommended'),
  {
    ignores: ['**/node_modules/**/*', '**/dist/**/*'],
    files: ['*.js', '*.ts', '*.astro'],
    languageOptions: {
      parser: typeScriptESLintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        semi: ['error', 'always'],
        'semi-spacing': ['error', { after: true, before: false }],
        'semi-style': ['error', 'last'],
        'no-extra-semi': 'error',
        'no-unexpected-multiline': 'error',
        'no-unreachable': 'error',
        'comma-dangle': ['error', 'only-multiline'],
      },
    },
  },
  {
    files: ['*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: typeScriptESLintParser,
        extraFileExtensions: ['.astro'],
      },
    },
  },
];
