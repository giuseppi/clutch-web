import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth'],
        },
      },
    },
  },
  define: {
    // Ensure environment variables are available
    'process.env': {},
  },
  server: {
    port: 3000,
    host: true,
  },
});
