import { config } from "@cstn/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    files: ['**/*.stories.@(ts|tsx)'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    }
  }
];
