/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors:{
        'accent-color': '#f1691c',
        'accent-color-lighter': '#F57E3A',
        'accent-2-color': '#0d3d54',
        'accent-2-color-lighter': '#58A1C3',
        'darker-color': '#1e1e1e',
        'dark-color': '#252526',
        'dark-color-lighter': '#333333',
        'dark-color-more-lighter': '#3c3c3c'
      }
    },
  },
  plugins: [],
}
