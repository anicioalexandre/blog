import { black, white } from './styles/palette'
import { typography } from './styles/typography'

const defaultTheme = require('tailwindcss/defaultTheme')

// Themed tokens are CSS variables defined in styles/tokens.css.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        object: {
          high: token('object-high'),
          low: token('object-low'),
          disabled: token('object-disabled'),
          contrast: token('object-contrast'),
        },
        surface: {
          background: token('surface-background'),
          default: token('surface-default'),
          active: token('surface-active'),
          disabled: token('surface-disabled'),
          border: token('surface-border'),
        },
        primary: {
          high: token('primary-high'),
          main: token('primary-main'),
          low: token('primary-low'),
          overlay: token('primary-overlay'),
          contrast: white.main,
        },
        ink: token('ink'),
        black: {
          main: black.main,
        },
        white: {
          main: white.main,
        },
      },
      boxShadow: {
        key: '0 3px 0 0 rgb(var(--shadow-hard))',
        retro: '4px 4px 0 0 rgb(var(--shadow-hard))',
        'retro-sm': '2px 2px 0 0 rgb(var(--shadow-hard))',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        pixel: ['"Pixelated MS Sans Serif"', ...defaultTheme.fontFamily.mono],
      },
      typography: {
        h1: {
          css: typography.h1,
        },
        h2: {
          css: typography.h2,
        },
        h3: {
          css: typography.h3,
        },
        h4: {
          css: typography.h4,
        },
        h5: {
          css: typography.h5,
        },
        h6: {
          css: typography.h6,
        },
        body1: {
          css: typography.body1,
        },
        body2: {
          css: typography.body2,
        },
        subtitle1: {
          css: typography.subtitle1,
        },
        subtitle2: {
          css: typography.subtitle2,
        },
        caption: {
          css: typography.caption,
        },
        overline: {
          css: typography.overline,
        },
        button: {
          css: typography.button,
        },
        DEFAULT: {
          css: {
            '--tw-prose-body': 'inherit',
            '--tw-prose-headings': 'inherit',
            '--tw-prose-links': 'inherit',
            '--tw-prose-links-hover': 'inherit',
            '--tw-prose-quote-borders': 'inherit',
            '--tw-prose-bullets': 'inherit',
            '--tw-prose-bold': 'inherit',
            '--tw-prose-hr': 'inherit',
            h1: typography.h1,
            h2: typography.h2,
            h3: typography.h3,
            h4: typography.h4,
            h5: typography.h5,
            h6: typography.h6,
            p: typography.body1,
            em: {
              color: 'rgb(var(--object-low))',
              fontStyle: 'italic',
            },
            blockquote: {
              color: 'rgb(var(--object-low))',
              borderLeftColor: 'rgb(var(--primary-main))',
              paddingLeft: '1rem',
              fontStyle: 'italic',
            },
            // Code blocks stay dark in both themes (matches Shiki github-dark)
            pre: {
              backgroundColor: '#24292e',
              padding: '1rem',
              borderRadius: '0.375rem',
              color: '#e6edf3',
            },
            code: {
              color: white.main,
              backgroundColor: '#8A5407',
              padding: '0.15rem 0.25rem',
              borderRadius: '0.25rem',
              '&::before': {
                content: 'none !important',
              },
              '&::after': {
                content: 'none !important',
              },
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
