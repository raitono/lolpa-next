const { themeVariants } = require('tailwindcss-theme-variants');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      spacing: {
        '100px': '100px',
        '110px': '110px',
        '150px': '150px',
        '200px': '200px',
        '300px': '300px'
      },
      colors: {
        oxford: '#0A1931',
        flickr: '#185ADB',
        jonquil: '#F8CF40',
        alabaster: '#E1E8DF',
      },
      gridTemplateRows: {
        'team-info': 'minmax(0, 2fr) repeat(5, minmax(0, 1fr))'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    themeVariants({
      group: 'matches',
      baseSelector: '',
      themes: {
        win: {
          selector: '[data-match-win=true]',
        },
        loss: {
          selector: '[data-match-win=false]',
        },
      },
    }),
    require('tailwind-nord'),
  ],
}
