import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://teaching-app-back-end.onrender.com', // Back-end port
      'base': '/Teaching_App_Front_End' // Front-end repo name for deployment on github
    },
  },
});