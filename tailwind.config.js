module.exports = {
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
        '300px': '300px'
      },
      colors: {
        oxford: '#0A1931',
        flickr: '#185ADB',
        jonquil: '#F8CF40',
        alabaster: '#E1E8DF'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
