import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // plugins = extensões do Vite: react entende JSX, tailwindcss gera o CSS
  plugins: [react(), tailwindcss()],
})
