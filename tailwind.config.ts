import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem', // 24px
        sm: '2rem',      // 32px
        md: '2.5rem',    // 40px
        lg: '3rem',      // 48px
        xl: '3.5rem',    // 56px
      },
    },
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
        'flicker-text-primary': 'flicker-primary-text-shadow 1.5s infinite alternate',
        'flicker-text-accent': 'flicker-accent-text-shadow 1.5s infinite alternate',
        'flicker-border-primary': 'flicker-primary-border-shadow 2s infinite alternate',
        'flicker-border-accent': 'flicker-accent-border-shadow 2s infinite alternate',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
