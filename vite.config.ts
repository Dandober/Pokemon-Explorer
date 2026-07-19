import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Served from https://<user>.github.io/pokemon-explorer/, so assets and
  // routes need to resolve under that subpath instead of the domain root.
  base: '/pokemon-explorer/',
  server: {
    port: 5174,
  },
})
