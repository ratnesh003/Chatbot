import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chatbot-5tek.onrender.com',  // your backend
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\api/, ''),
      },
    },
  },
})
