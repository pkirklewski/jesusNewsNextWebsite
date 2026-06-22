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
        // ===== Council-recommended palette v2 =====
        // „kontemplacyjna powaga starej biblioteki" + „atramentowa elegancja"
        // Inspiracja: Plough Quarterly + Aeon + Dwutygodnik + First Things

        // Backgrounds
        paper:        '#FAFAF8',    // global bg — papier off-white
        parchment:    '#F2F0EB',    // section/card bg — pergamin
        ink:          '#1C1C1E',    // headlines — atramentowy black
        graphite:     '#2D2D2D',    // body text — ciepły charcoal
        sepia:        '#6B6560',    // secondary/meta — szarość sepii
        oxblood:      '#803A3C',    // primary accent — burgundy/krew Chrystusa
        'oxblood-hover': '#9C4A4D', // hover state oxblood
        forest:       '#5E6E6B',    // secondary accent — deep forest green
        rule:         '#DCD8D0',    // borders/dividers

        // Aliases for compatibility with existing components
        background:    '#FAFAF8',
        card:          '#F2F0EB',
        'card-hover':  '#EDEAE3',
        accent:        '#803A3C',      // map old accent → oxblood
        'accent-gold-warm': '#803A3C', // map → oxblood (no more gold)
        'accent-pale': '#F2F0EB',
        navy:          '#1C1C1E',      // map navy → ink (no more navy header)
        'navy-dark':   '#000000',
        ivory:         '#F2F0EB',
        cream:         '#F2F0EB',
        'text-primary':   '#2D2D2D',
        'text-secondary': '#6B6560',
        'text-muted':     '#9c9c9c',
        border:        '#DCD8D0',
        'border-light': '#E8E4DC',
      },
      fontFamily: {
        // ===== Council typography stack =====
        display: ['"Cormorant Garamond"', 'Garamond', 'Georgia', 'serif'],
        serif:   ['Lora', 'Georgia', 'serif'],
        sans:    ['"Source Sans Pro"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'slide-up':        'slide-up 0.4s ease-out',
        'attention-wiggle':'attention-wiggle 1.1s ease-in-out',
        'ping-slow':       'ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'headline-fade':   'headline-fade 0.6s ease-out',
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
