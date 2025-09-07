// @ts-ignore - eslint-plugin-unicorn doesn't have TypeScript declarations
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      'public',
      '.next',
      '.turbo',
      'out',
      'storybook-static',
      'cypress/videos',
      'cypress/screenshots',
    ],
  },
  ...compat.extends('next/core-web-vitals'),
  {
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      // Allow JSX without React import in Next.js
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    files: ['src/components/**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'src/components/ui/**/*.{js,jsx,ts,tsx}',
      '**/actions.{js,jsx,ts,tsx}',
      '**/*.schema.{js,jsx,ts,tsx}',
    ],
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
    },
  },
];

export default eslintConfig;
