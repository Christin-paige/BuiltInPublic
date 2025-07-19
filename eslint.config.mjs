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
  ...compat.extends('next/core-web-vitals'),
  {
    plugins: {
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      'quotes': ['error', 'single', { avoidEscape: true }],
      'react/jsx-pascal-case': [
        'error',
        {
          allowAllCaps: true,
          ignore: [],
        },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      // Allow JSX without React import in Next.js
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default eslintConfig;
