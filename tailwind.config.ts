import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animationFillMode: {
        forwards: 'forwards',
      },
      fontFamily: {
        primary: ['SF Pro Display'],
      },
      colors: {
        main: '#00B1A6',
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        beatingHeart: {
          '0%': {
            transform: 'scale(1)',
          },

          '15%': {
            transform: 'scale(0.98)',
          },
          '30%': {
            transform: 'scale(1)',
          },

          '45%': {
            transform: 'scale(0.98)',
          },

          '60%': {
            transform: 'scale(1)',
          },
        },
        skeleton: {
          '0%': {
            'background-color': 'rgba(165, 165, 165, 0.3)',
          },
          '50%': {
            'background-color': 'rgba(165, 165, 165, 0.5)',
          },
          '100%': {
            'background-color': 'rgba(165, 165, 165, 0.3)',
          },
        },
        mainLogo: {
          '0%': {
            transform: 'scale(1) translateX(30%)',
          },
          '70%': {
            transform: 'scale(0.7) translateX(0px)',
          },
          '100%': {
            transform: 'scale(0.7) translateX(0px)',
          },
        },
        mainText: {
          '0%': {
            transform: 'translateX(-50px)',
            opacity: '0',
          },
          '20%': {
            transform: 'translateX(-50px)',
            opacity: '0',
          },
          '90%': {
            transform: 'translateX(-15px)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(-15px)',
            opacity: '1',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        beatingHeart: 'beatingHeart 1.3s linear infinite',
        skeleton: 'skeleton 1.5s ease-in-out infinite',
        mainLogo: 'mainLogo 1s ease-in',
        mainText: 'mainText 1s linear ',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
