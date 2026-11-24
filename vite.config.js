import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 相对路径，部署到 Nginx 任意目录都能正确加载静态资源
  base: './',
  server: {
    port: 5173,
    host: '0.0.0.0'
  }
})
