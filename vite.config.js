import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: 'public',
  // Serve the root images directory as well so /images/... routes work seamless
  server: {
    fs: {
      allow: ['.', 'images']
    }
  }
})
