import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/react-glasses/",
  plugins: [react()],
  server: {
    host: 'localhost',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
})
