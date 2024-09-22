import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Back-end port
      'base': '/Teaching_App_Front_End' // Front-end repo name for deployment on github
    },
  },
});