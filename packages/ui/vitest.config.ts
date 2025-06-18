
import reactConfig from '@cstn/vitest-config/react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  ...reactConfig,
  test: {
    ...reactConfig.test,
    setupFiles: ['./vitest.setup.tsx'],
  }
})
