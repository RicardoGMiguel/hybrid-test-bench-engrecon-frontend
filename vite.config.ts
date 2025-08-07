import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ValidateEnv } from '@julr/vite-plugin-validate-env';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsConfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';
import { z } from 'zod';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    VitePWA({
      manifest: {
        theme_color: '#ffffff',
      },
      devOptions: {
        resolveTempFolder: () => 'dev',
        enabled: true,
      },
    }),
    react(),
    tsConfigPaths(),
    ValidateEnv({
      validator: 'zod',
      schema: {
        VITE_API_URL: z.string().url(),
      },
    }),
  ],
  build: {
    manifest: true,
  },
  resolve: {
    alias: [
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components'),
      },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
      {
        find: '@interfaces',
        replacement: path.resolve(__dirname, './src/interfaces'),
      },
      {
        find: '@layout',
        replacement: path.resolve(__dirname, './src/layout'),
      },
      {
        find: '@modules',
        replacement: path.resolve(__dirname, './src/modules'),
      },
      {
        find: '@routes',
        replacement: path.resolve(__dirname, './src/routes'),
      },
      {
        find: '@configs',
        replacement: path.resolve(__dirname, './src/configs'),
      },
      {
        find: '@services',
        replacement: path.resolve(__dirname, './src/services'),
      },
      { find: '@style', replacement: path.resolve(__dirname, './src/style') },
      { find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
      { find: '@errors', replacement: path.resolve(__dirname, './src/errors') },
    ],
  },
});
