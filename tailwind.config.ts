import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--line) / var(--line-alpha))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        brand: {
          DEFAULT: 'hsl(var(--brand) / <alpha-value>)',
          2: 'hsl(var(--brand-2) / <alpha-value>)',
          soft: 'hsl(var(--brand-soft) / <alpha-value>)',
          strong: 'hsl(var(--brand-strong) / <alpha-value>)',
          foreground: 'hsl(var(--brand-foreground) / <alpha-value>)',
          text: 'hsl(var(--brand-text) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'hsl(var(--surface) / <alpha-value>)',
          2: 'hsl(var(--surface-2) / <alpha-value>)',
        },
        line: 'hsl(var(--line) / var(--line-alpha))',
        warm: 'hsl(var(--warm) / <alpha-value>)',
        ink: {
          DEFAULT: 'hsl(var(--ink) / <alpha-value>)',
          2: 'hsl(var(--ink-2) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'var(--radius)',
        sm: 'var(--radius)',
      },
      boxShadow: {
        mockup:
          '0 1px 0 hsl(var(--foreground) / 0.04), 0 40px 80px -30px hsl(var(--foreground) / 0.3)',
        glow: '0 20px 60px -20px hsl(var(--brand) / 0.5)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fw-pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'fw-float': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        'fw-spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-ring':
          'fw-pulse-ring 1.8s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        float: 'fw-float 7s ease-in-out infinite',
        'spin-slow': 'fw-spin-slow 24s linear infinite',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
        mono: 'var(--font-mono)',
        geist: 'var(--font-sans)',
      },
      fontSize: {
        'display-xl': [
          'clamp(2.6rem, 6.4vw, 6rem)',
          { lineHeight: '1.02', letterSpacing: '0.02em' },
        ],
        'display-lg': [
          'clamp(2.25rem, 5vw, 4.5rem)',
          { lineHeight: '1.02', letterSpacing: '-0.02em' },
        ],
        'display-md': [
          'clamp(1.9rem, 4vw, 3.5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.02em' },
        ],
        'display-sm': [
          'clamp(1.5rem, 2.8vw, 2.25rem)',
          { lineHeight: '1.1', letterSpacing: '-0.015em' },
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
