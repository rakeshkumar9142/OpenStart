import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: false,
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // 👇 This ensures SPA fallback
  build: {
    rollupOptions: {},
  },
  preview: {
    port: 4173,
    strictPort: true,
  }
})
