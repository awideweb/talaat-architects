/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      // Mobile-first responsive breakpoints
      'xs': '375px',   // Small mobile devices
      'sm': '640px',   // Large mobile devices
      'md': '768px',   // Tablets
      'lg': '1024px',  // Small laptops
      'xl': '1280px',  // Large laptops/desktops
      '2xl': '1536px', // Large desktops
      '3xl': '1920px', // Ultra-wide screens
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Dark blur background colors for UI elements
        'blur': {
          'dark': 'rgba(0, 0, 0, 0.7)',
          'darker': 'rgba(0, 0, 0, 0.8)',
          'darkest': 'rgba(0, 0, 0, 0.9)',
          'light': 'rgba(255, 255, 255, 0.1)',
          'lighter': 'rgba(255, 255, 255, 0.2)',
        }
      },
      spacing: {
        // Mobile-optimized spacing scale
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
      },
      fontSize: {
        // Responsive typography scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      animation: {
        // Smooth animations for mobile
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'header-shrink': 'headerShrink 0.3s ease-out',
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
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        headerShrink: {
          '0%': { height: '80px', padding: '1rem' },
          '100%': { height: '60px', padding: '0.5rem' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      gridTemplateColumns: {
        // Responsive grid layouts
        'gallery-mobile': '1fr',
        'gallery-tablet': 'repeat(2, 1fr)',
        'gallery-desktop': 'repeat(3, 1fr)',
        'footer': 'repeat(3, 1fr)',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '16/9': '16 / 9',
        '3/2': '3 / 2',
        '1/1': '1 / 1',
      },
      zIndex: {
        'modal': '1000',
        'header': '100',
        'footer': '90',
        'overlay': '80',
      }
    },
  },
  plugins: [],
}

export default config
