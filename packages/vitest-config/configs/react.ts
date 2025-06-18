import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    dir: 'src',
    include: ['**/*.{test,spec}.{ts,tsx}'],
    alias: {
      '@/': '/src/',
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/'],
      exclude: [...coverageConfigDefaults.exclude, 'components/ui/**'],
      thresholds: {
        branches: 20,
        functions: 20,
        lines: 20,
        statements: 20,
      },
    },
    server: {
      deps: {
        // https://github.com/vercel/next.js/issues/77200
        inline: ['next-intl'],
      },
    },
  },
});
