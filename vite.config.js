import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backendProxy = {
  target: 'http://127.0.0.1:8600',
  changeOrigin: true,
}

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    proxy: {
      '/api': backendProxy,
      '/uploads': backendProxy,
    },
  },
  preview: {
    allowedHosts: true,
    proxy: {
      '/api': backendProxy,
      '/uploads': backendProxy,
    },
  },
})
