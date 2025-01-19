import { black, grey, object, primary, surface, white } from './styles/palette'
import { typography } from './styles/typography'

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        object: {
          high: object.high,
          low: object.low,
          disabled: object.disabled,
          contrast: object.contrast,
        },
        surface: {
          background: surface.background,
          default: surface.default,
          active: surface.active,
          disabled: surface.disabled,
          border: surface.border,
        },
        primary: {
          high: primary.dark,
          main: primary.main,
          low: primary.light,
          overlay: primary.lighter,
          contrast: white.main,
        },
        black: {
          main: black.main,
        },
        white: {
          main: white.main,
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
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
              color: object.low,
              fontStyle: 'italic',
            },
            blockquote: {
              color: object.low,
              borderLeftColor: primary.main,
              paddingLeft: '1rem',
              fontStyle: 'italic',
            },
            pre: {
              backgroundColor: surface.active,
              padding: '1rem',
              borderRadius: '0.375rem',
              color: object.high,
            },
            code: {
              color: primary.darker,
              backgroundColor: grey[200],
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
