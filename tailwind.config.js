/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './src/**/*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#003b49',
          950: '#00232b',
          900: '#002a34',
          800: '#01313c',
          700: '#0a4a58',
          600: '#12606f'
        },
        brand: {
          DEFAULT: '#2dcd7c',
          50: '#ecfbf3',
          100: '#d2f6e3',
          200: '#a8edc9',
          500: '#2dcd7c',
          600: '#22b56b',
          700: '#178f53',
          800: '#147244'
        },
        cloud: '#f3f6f7',
        sand: '#f5f0e6',
        line: '#e1e8ea',
        muted: '#62787d'
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif']
      },
      boxShadow: {
        soft: '0 18px 50px -24px rgba(0, 59, 73, 0.25)',
        card: '0 24px 70px -34px rgba(0, 59, 73, 0.35)',
        lift: '0 34px 70px -34px rgba(0, 59, 73, 0.45)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      maxWidth: {
        '8xl': '90rem'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        fadeIn: 'fadeIn 0.4s ease-out both'
      }
    }
  },
  plugins: []
};
