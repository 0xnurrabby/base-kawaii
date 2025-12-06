/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        peach: {
          50: '#fff7f3',
          100: '#ffefe6',
          200: '#ffd7bf',
          300: '#ffb899',
          400: '#ff9470'
        },
        blush: {
          50: '#fff5f8',
          100: '#ffe6f0',
          200: '#ffbfd2',
          300: '#ff99bb',
          400: '#ff76a5'
        },
        cream: {
          50: '#fffbf2',
          100: '#fff5e1',
          200: '#ffe9c2'
        },
        mint: {
          50: '#f2fff9',
          100: '#e0ffef',
          200: '#bdf9dc'
        }
      },
      boxShadow: {
        soft: '0 8px 30px rgba(255, 182, 193, 0.35)'
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem'
      }
    }
  },
  plugins: []
};
