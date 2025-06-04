import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['Space Grotesk', 'monospace'], // Using Space Grotesk for a computerized monospaced feel
      },
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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'glitch-anim-1': {
          '0%': { clipPath: 'inset(10% -6px 85% 0)' },
          '10%': { clipPath: 'inset(80% -6px 10% 0)' },
          '20%': { clipPath: 'inset(35% -6px 50% 0)' },
          '30%': { clipPath: 'inset(60% -6px 20% 0)' },
          '40%': { clipPath: 'inset(20% -6px 70% 0)' },
          '50%': { clipPath: 'inset(90% -6px 5% 0)' },
          '60%': { clipPath: 'inset(45% -6px 40% 0)' },
          '70%': { clipPath: 'inset(70% -6px 15% 0)' },
          '80%': { clipPath: 'inset(25% -6px 60% 0)' },
          '90%': { clipPath: 'inset(55% -6px 30% 0)' },
          '100%': { clipPath: 'inset(5% -6px 90% 0)' },
        },
        'glitch-anim-2': {
          '0%': { clipPath: 'inset(80% 0 15% -4px)' },
          '10%': { clipPath: 'inset(5% 0 90% -4px)' },
          '20%': { clipPath: 'inset(65% 0 20% -4px)' },
          '30%': { clipPath: 'inset(30% 0 60% -4px)' },
          '40%': { clipPath: 'inset(75% 0 10% -4px)' },
          '50%': { clipPath: 'inset(15% 0 80% -4px)' },
          '60%': { clipPath: 'inset(50% 0 40% -4px)' },
          '70%': { clipPath: 'inset(90% 0 2% -4px)' },
          '80%': { clipPath: 'inset(40% 0 50% -4px)' },
          '90%': { clipPath: 'inset(20% 0 70% -4px)' },
          '100%': { clipPath: 'inset(60% 0 30% -4px)' },
        },
        'flicker-primary-text-shadow': {
          '0%, 100%': {
            textShadow: '0 0 2px hsl(var(--primary)), 0 0 5px hsl(var(--primary)), 0 0 8px hsl(var(--primary) / 0.7)',
            opacity: '1',
          },
          '50%': {
            textShadow: '0 0 1px hsl(var(--primary)), 0 0 3px hsl(var(--primary) / 0.5)',
            opacity: '0.85',
          },
        },
        'flicker-accent-text-shadow': {
          '0%, 100%': {
            textShadow: '0 0 2px hsl(var(--accent)), 0 0 5px hsl(var(--accent)), 0 0 8px hsl(var(--accent) / 0.7)',
            opacity: '1',
          },
          '50%': {
            textShadow: '0 0 1px hsl(var(--accent)), 0 0 3px hsl(var(--accent) / 0.5)',
            opacity: '0.85',
          },
        },
        'flicker-primary-border-shadow': {
           '0%, 100%': {
            boxShadow: '0 0 3px hsl(var(--primary)), 0 0 6px hsl(var(--primary)), inset 0 0 2px hsl(var(--primary))',
          },
          '50%': {
            boxShadow: '0 0 1px hsl(var(--primary)), 0 0 2px hsl(var(--primary) / 0.7), inset 0 0 1px hsl(var(--primary) / 0.7)',
          },
        },
        'flicker-accent-border-shadow': {
          '0%, 100%': {
            boxShadow: '0 0 3px hsl(var(--accent)), 0 0 6px hsl(var(--accent)), inset 0 0 2px hsl(var(--accent))',
          },
          '50%': {
            boxShadow: '0 0 1px hsl(var(--accent)), 0 0 2px hsl(var(--accent) / 0.7), inset 0 0 1px hsl(var(--accent) / 0.7)',
          },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'glitch-1': 'glitch-anim-1 2s infinite linear alternate-reverse',
        'glitch-2': 'glitch-anim-2 3s infinite linear alternate-reverse',
        'flicker-text-primary': 'flicker-primary-text-shadow 1.5s infinite alternate',
        'flicker-text-accent': 'flicker-accent-text-shadow 1.5s infinite alternate',
        'flicker-border-primary': 'flicker-primary-border-shadow 2s infinite alternate',
        'flicker-border-accent': 'flicker-accent-border-shadow 2s infinite alternate',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
