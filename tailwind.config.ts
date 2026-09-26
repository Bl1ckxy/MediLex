import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
    darkMode: ['class'],
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                navy: {
                    DEFAULT: '#0F1B35',
                    50: '#E8EDF5',
                    100: '#C5D0E3',
                    200: '#9BAAC8',
                    300: '#7184AD',
                    400: '#4D6192',
                    500: '#2E4270',
                    600: '#1F3058',
                    700: '#162545',
                    800: '#0F1B35',
                    900: '#080E1C',
                },
                ivory: {
                    DEFAULT: '#F5F0E8',
                    50: '#FEFDFB',
                    100: '#FAF7F2',
                    200: '#F5F0E8',
                    300: '#E8DECE',
                    400: '#DBCCB4',
                    500: '#CEBA9A',
                },
                gold: {
                    DEFAULT: '#C49A3C',
                    50: '#FCF6E8',
                    100: '#F5E5BF',
                    200: '#EDD496',
                    300: '#D9B464',
                    400: '#C49A3C',
                    500: '#A67F2A',
                    600: '#886520',
                },
                crimson: {
                    DEFAULT: '#C0392B',
                    50: '#FDECEB',
                    100: '#F5C6C1',
                    200: '#E88D84',
                    300: '#D4574A',
                    400: '#C0392B',
                    500: '#962D22',
                    600: '#6C2019',
                },
                slate: {
                    DEFAULT: '#E8EDF5',
                },
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                serif: ['Lora', ...defaultTheme.fontFamily.serif],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
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
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};

export default config;
// âœ“ FILE COMPLETE â€” tailwind.config.ts