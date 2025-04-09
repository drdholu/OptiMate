import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
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
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				mate: {
					50: '#f2eafa',
					100: '#e4d5f5',
					200: '#c8abeb',
					300: '#ad82e0',
					400: '#9158d6',
					500: '#762ecc',
					600: '#6025a3',
					700: '#491c7a',
					800: '#311352',
					900: '#180929',
					950: '#0c0414',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			borderWidth: {
				'3': '3px'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' },
				},
				'slide-in': {
					from: { transform: 'translateY(10px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' },
				},
				'typing': {
					'0%': { width: '0%' },
					'20%': { width: '20%' },
					'40%': { width: '40%' },
					'60%': { width: '60%' },
					'80%': { width: '80%' },
					'100%': { width: '100%' },
				},
				'blink': {
					'50%': { opacity: '0' },
				},
				'bounce-light': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				'pulse-light': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in': 'slide-in 0.4s ease-out',
				'typing': 'typing 1.5s steps(30, end)',
				'blink': 'blink 0.7s infinite',
				'bounce-light': 'bounce-light 1.5s ease-in-out infinite',
				'pulse-light': 'pulse-light 1.5s ease-in-out infinite',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			boxShadow: {
				'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.08)',
				'glow': '0 0 15px rgba(116, 45, 204, 0.15)',
				'inner-glow': 'inset 0 0 10px rgba(116, 45, 204, 0.1)',
			},
			backgroundImage: {
				'dark-mesh': 'radial-gradient(at 80% 10%, hsla(228, 28%, 15%, 0.5) 0px, transparent 50%), radial-gradient(at 10% 90%, hsla(228, 22%, 12%, 0.6) 0px, transparent 50%)',
				'subtle-dots': 'radial-gradient(hsla(var(--foreground), 0.05) 1px, transparent 1px)',
				'subtle-grid': 'linear-gradient(transparent 1px, transparent 1px), linear-gradient(to right, hsla(var(--foreground), 0.05) 1px, transparent 1px)',
				'gradient-border': 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)/0.5))',
			}
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;
