import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        'browse-councils': './browse-councils.html',
        'council-hub': './council-hub.html',
        'invest-now': './invest-now.html'
      }
    }
  }
});
