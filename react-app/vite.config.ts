import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    eslintPlugin(),
    checker({ typescript: true })
  ],
  server: {
    open: true
  }
});
