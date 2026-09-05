import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Served from https://<user>.github.io/hello-world/task-manager/ in production
  // (GitHub Pages), but from the server root during local dev.
  base: command === 'build' ? '/hello-world/task-manager/' : '/',
  plugins: [react()],
}))
