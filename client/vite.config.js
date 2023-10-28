/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// eslint-disable-next-line import/no-unresolved
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // eslint-disable-next-line quotes
        additionalData: `@import "./src/assets/styles/variables.scss";`,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
