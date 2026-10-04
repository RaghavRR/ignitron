/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ignitron: {
          orange: '#F97316',
          amber: '#FB923C',
          navy: '#0B1220',
          charcoal: '#131A2A',
          light: '#F7F8FA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};
