import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/portfolio-ts/',
  plugins: [react()],
  build: {
    assetsDir: 'assets', // Carpeta de salida para los assets
    chunkSizeWarningLimit: 2000, // Set the warning limit to 1000 kB
    outDir: 'dist', // Carpeta de salida para los archivos construidos
    sourcemap: false, // Desactivar mapas de origen para producción
  },
  server: {
    host: '0.0.0.0',
    port: 3000, // default: 3000
  }, 
})
