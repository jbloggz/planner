import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'istanbul',
    },
    setupFiles: ['src/setupTests.ts'],
  },
});
