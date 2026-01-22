// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  server: {
      host: true,
      port: 8080
  },
  env: {
      schema: {
        APP_URL: envField.string({ context: 'server', access: 'public', default: 'http://localhost:3300' }),
        BASE_URL: envField.string({ context: 'client', access: 'public', default: 'http://localhost:3300' }),
        APP_SECRET_KEY: envField.string({ context: 'server', access: 'secret', default: 'app_key' }),
      }
  },
  vite: {
      plugins: [
          tailwindcss(),
      ],
  },

  integrations: [react()],
});