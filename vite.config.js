import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/zhipu': {
        target: 'https://open.bigmodel.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/zhipu/, ''),
      },
      '/api/kling': {
        target: 'https://api-beijing.klingai.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/kling/, ''),
      }
    }
  }
})
