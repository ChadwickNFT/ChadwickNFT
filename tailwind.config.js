/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        'rich-black': '#0A0A0A',
        'dark-gray': '#1A1A1A',
        'gold': '#D4AF37',
        'gold-light': '#F4CE70',
        'gold-dark': '#B4912F',
        'nft-glow': '#7FFFD4', // Aquamarine color
      },
      fontFamily: {
        'display': ['Montserrat', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-out',
        'slide-up': 'slideUp 1s ease-out',
        'slide-down': 'slideDown 1s ease-out',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-slow': 'glow 2s ease-in-out infinite alternate',
        'pulse-quick': 'pulse-quick 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 4px rgb(127, 255, 212, 0.6), 0 0 8px rgb(127, 255, 212, 0.4)',
            opacity: '0.8'
          },
          '50%': { 
            textShadow: '0 0 8px rgb(127, 255, 212, 0.8), 0 0 16px rgb(127, 255, 212, 0.6)',
            opacity: '1'
          },
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        glow: {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '0.7' }
        },
        'pulse-quick': {
          '0%': { 
            color: '#D4AF37',
            transform: 'scale(1)',
            textShadow: '0 0 0px rgba(255,255,255,0)'
          },
          '10%': { 
            color: '#FFFFFF',
            transform: 'scale(1.01)',
            textShadow: '0 0 30px rgba(255,255,255,0.8)'
          },
          '40%': { 
            color: '#FFFFFF',
            transform: 'scale(1.01)',
            textShadow: '0 0 20px rgba(255,255,255,0.6)'
          },
          '60%': { 
            color: '#D4AF37',
            transform: 'scale(1)',
            textShadow: '0 0 10px rgba(255,255,255,0.3)'
          },
          '100%': { 
            color: '#D4AF37',
            transform: 'scale(1)',
            textShadow: '0 0 0px rgba(255,255,255,0)'
          }
        }
      },
    },
  },
  plugins: [],
}
