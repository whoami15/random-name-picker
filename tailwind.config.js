import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Bricolage Grotesque', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        lila: {
          50: '#fbfaff',
          100: '#f7f5ff',
          200: '#eae6fe',
          300: '#e2dcfe',
          400: '#d6cefd',
          500: '#c8befd',
          600: '#b4a6fc',
          700: '#a08dfb',
          800: '#836bfa',
          900: '#5534f9'
        }
      }
    }
  },
  plugins: [typography, forms]
}
