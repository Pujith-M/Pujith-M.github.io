import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // PERF-18: Split heavy libraries into separate chunks for immutable caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) return 'three-vendor';
            if (id.includes('@react-three/drei')) return 'drei-vendor';
            if (id.includes('@react-three/fiber')) return 'fiber-vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1200 // Increased for 3D bundles
  }
})
