import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // JesusNews palette — warm cream/ivory with navy + gold accents
        // (matches newsletter v5 visual identity)
        background: '#f5f1ea',       // warm cream page background
        card: '#ffffff',             // white article cards
        'card-hover': '#fbf6ec',     // soft ivory on hover
        accent: '#b8923e',           // primary gold (body accents)
        'accent-gold-warm': '#D6B25E', // warmer gold (headlines on navy)
        'accent-pale': '#F5F0E6',    // very pale gold for backgrounds
        navy: '#17233A',             // deep navy (primary text + header bg)
        'navy-dark': '#0F1B2D',
        ivory: '#fbf6ec',
        cream: '#f5ede0',
        'text-primary': '#17233A',   // deep navy main text
        'text-secondary': '#6b6b6b', // mid-grey secondary
        'text-muted': '#9c9c9c',
        border: '#e0d8c8',
        'border-light': '#ede5d3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'Times', 'serif'],
      },
      animation: {
        'slide-up': 'slide-up 0.4s ease-out',
        'attention-wiggle': 'attention-wiggle 1.1s ease-in-out',
        'ping-slow': 'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'headline-fade': 'headline-fade 0.6s ease-out',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'attention-wiggle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '20%': { transform: 'translateY(-10px)' },
          '40%': { transform: 'translateY(0)' },
          '55%': { transform: 'translateY(-6px)' },
          '70%': { transform: 'translateY(0)' },
          '85%': { transform: 'translateY(-2px)' },
        },
        'ping-slow': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '75%, 100%': { transform: 'scale(1)', opacity: '0' },
        },
        'headline-fade': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
