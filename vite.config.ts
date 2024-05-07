/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({
    svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
      include: '**/*.svg',
  })],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
    },
  }
})
