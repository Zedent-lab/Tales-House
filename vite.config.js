import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Tales-House/',  // <-- Add this line with your repo name
  plugins: [react()],
})
