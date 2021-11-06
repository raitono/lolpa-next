const { themeVariants } = require("tailwindcss-theme-variants");

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      gridTemplateRows: {
        'team-info': 'minmax(0, 2fr) repeat(5, minmax(0, 1fr))'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-theming')({
      preset: 'nord'
    }),
    themeVariants({
      baseSelector: '.match',
      themes: {
        win: {
          selector: '[data-win=true]'
        },
        loss: {
          selector: '[data-win=false]'
        }
      }
    }),
  ],
}
