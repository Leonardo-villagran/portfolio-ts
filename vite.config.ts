import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    assetsDir: 'assets', // Carpeta de salida para los assets
    chunkSizeWarningLimit: 2000, // Set the warning limit to 1000 kB
    outDir: 'dist', // Carpeta de salida para los archivos construidos
    sourcemap: false, // Desactivar mapas de origen para producción
  },
  // preview: {
  //   port: 4173,
  //   strictPort: true,
  //  },
  server: {
    port: 4173,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:4173",
    // usePolling: necesario en unidades de red (Y:) donde el watcher nativo no detecta cambios
    watch: {
      usePolling: true,
      interval: 1000,
    },
  }, 
})
