import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lightningcss'] // prevent esbuild errors
  },
  server: {
    port: 5175
  }
})