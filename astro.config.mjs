import cloudflare from '@astrojs/cloudflare'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { defineConfig } from 'astro/config'

import { config } from './src/constants/site'
import { remarkReadingTime } from './src/utils/markdown'

export default defineConfig({
  site: config.site,
  markdown: {
    remarkPlugins: [remarkReadingTime],
    drafts: true,
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },

  integrations: [mdx(), sitemap(), tailwind(), react()],

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            highlight: ['rehype-highlight'],
            react: ['react', 'react-dom'],
            astro: ['@astrojs/react-client'],
          },
        },
      },
    },
    plugins: [
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
        plugins: ['relay'],
      }),
      commonjs(),
    ],
  },

  output: 'server',
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
})
