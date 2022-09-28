/* eslint-disable */

const { screens } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

const spacing = {}
const fontSize = {}

for (let i = 0; i <= 500; i++) {
  spacing[i] = i === 0 ? i : `${i}px`
}
for (let i = 12; i <= 100; i++) {
  if (i % 2 === 0) fontSize[i] = `${i}px`
}

module.exports = {
  darkMode: 'class',
  // 去除默认的taiwindcss
  corePlugins: {
    preflight: false,
  },
  mode: 'jit',
  theme: {
    spacing,
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: {
        50: 'var(--color-gray-50)',
        100: 'var(--color-gray-100)',
        200: 'var(--color-gray-200)',
        300: 'var(--color-gray-300)',
        400: 'var(--color-gray-400)',
        500: 'var(--color-gray-500)',
        600: 'var(--color-gray-600)',
        700: 'var(--color-gray-700)',
        800: 'var(--color-gray-800)',
        900: 'var(--color-gray-900)',
      },
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
    },
    // boxShadow: {
    //   sm: 'var(--shadow-sm)',
    //   DEFAULT: 'var(--shadow)',
    //   md: 'var(--shadow-md)',
    //   lg: 'var(--shadow-lg)',
    //   xl: 'var(--shadow-xl)',
    //   '2xl': 'var(--shadow-2xl)',
    //   inner: 'var(--shadow-inner)',
    // },
    extend: {
      backgroundImage: {
        'my-pic': "url('/src/assets/my-pic.jpg')",
      },
      keyframes: {
        'text-shimmer': {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(0.5deg)' },
          '75%': { transform: 'rotate(-0.5deg)' },
        },
        flash: {
          '0%': { opacity: '0.2' },
          '20%': { opacity: '1' },
          '100%': { opacity: '0.2' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'text-shimmer': 'text-shimmer 2.5s ease-out infinite alternate',
        tilt: 'tilt 10s infinite linear',
        flash: 'flash 1.4s infinite linear',
        shimmer: 'shimmer 8s ease-in-out infinite',
      },
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary-500)',
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
        info: 'var(--info)',
      },
      width: fontSize,
      fontSize,
      fontFamily: {
        montserrat: 'Montserrat',
        poppins: 'Poppins',
        inter: 'Inter',
      },
      minWidth: {
        'screen-sm': screens.sm,
        'screen-md': screens.md,
        'screen-lg': screens.lg,
        'screen-xl': screens.xl,
        'screen-2xl': screens['2xl'],
      },
      minHeight: {
        200: '200px',
        'screen-sm': screens.sm,
        'screen-md': screens.md,
        'screen-lg': screens.lg,
        'screen-xl': screens.xl,
        'screen-2xl': screens['2xl'],
      },
      lineHeight: {
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        28: '28px',
        32: '32px',
        36: '36px',
        40: '40px',
      },
    },
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
  ],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}
