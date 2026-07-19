import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    // Served from https://<user>.github.io/Pokemon-Explorer/, so assets and
    // routes need to resolve under that subpath instead of the domain root.
    // Must match the GitHub repo name's exact casing -- GitHub Pages paths are case-sensitive.
    base: '/Pokemon-Explorer/',
    server: {
          port: 5174,
    },
})
