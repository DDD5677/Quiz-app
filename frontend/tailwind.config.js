/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      mx: '320px',
      ms: '420px',
      sm: '575px',
      md: '767px',
      lg: '820px',
      xl: '992px',
      '2xl': '1080px',
      '3xl': '1280px'
    },
    //  container: {
    //    center: true,
    //    padding: {
    //      DEFAULT: '1rem'
    //    }
    //  },
    fontSize: {
      xl: ['28px', '32px']
    },
    extend: {}
  },
  darkMode: 'class',
  corePlugins: {
    // ...
    container: false
  },
  plugins: []
}
