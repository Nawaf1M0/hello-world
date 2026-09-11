import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // The GitHub Pages workflow publishes task-manager/dist as the site root,
  // so it's served from https://<user>.github.io/hello-world/ in production
  // (not /hello-world/task-manager/ — there's no extra path segment for the
  // subdirectory since dist itself becomes the Pages root). Local dev keeps
  // using the server root.
  base: command === 'build' ? '/hello-world/' : '/',
  plugins: [react()],
}))
