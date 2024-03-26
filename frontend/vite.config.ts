// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ registerType: 'autoUpdate' }),
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Adjust the chunk size warning limit as needed
  },
});