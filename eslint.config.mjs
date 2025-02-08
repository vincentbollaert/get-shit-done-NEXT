import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import html from 'eslint-plugin-html';
import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/*.svg', '**/*.scss'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
    ),
  ),
  {
    plugins: {
      html,
      react: fixupPluginRules(react),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 8,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      'import/resolver': {
        alias: {
          map: [['~', './src']],
          extensions: ['.ts', '.tsx'],
        },
      },
    },

    rules: {
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-named-default': 'off',
      'no-nested-ternary': 'off',
      'no-use-before-define': 'off',
      semi: 'error',
    },
  },
];
