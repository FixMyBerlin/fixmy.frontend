import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from '@honkhonk/vite-plugin-svgr';

export default defineConfig({
  root: './src',
  server: {
    port: 8080,
  },
  build: {
    // Relative to the root
    outDir: '../build',
  },
  resolve: {
    alias: {
      '~': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    svgr(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'FixMyBerlin DevServer',
          siteUrl: 'http://localhost:8080',
        },
      },
    }),
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: '**/*.{jsx,tsx}',
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
  ],
  publicDir: '../public',
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
});
