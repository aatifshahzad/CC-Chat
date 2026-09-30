/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0A',
        lime: {
          DEFAULT: '#D4FF4F',
          dim: 'rgba(212,255,79,0.16)',
        },
        ink: {
          DEFAULT: '#FAFAFA',
          muted: 'rgba(250,250,250,0.64)',
          faint: 'rgba(250,250,250,0.4)',
        },
        line: 'rgba(255,255,255,0.06)',
        surface: 'rgba(255,255,255,0.03)',
        glass: 'rgba(255,255,255,0.04)',
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"Geist Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['clamp(48px, 7vw, 88px)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        h1: ['clamp(36px, 5vw, 64px)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        h2: ['clamp(24px, 3vw, 32px)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h3: ['clamp(20px, 2.5vw, 28px)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        body: ['16px', { lineHeight: '1.6' }],
        mono: ['13px', { lineHeight: '1.7' }],
      },
      letterSpacing: {
        eyebrow: '0.4em',
      },
      borderRadius: {
        card: '16px',
      },
      maxWidth: {
        content: '1280px',
      },
      spacing: {
        section: 'clamp(80px, 10vw, 160px)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
        drift: {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-120px,-240px,0)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        drift: 'drift 40s linear infinite',
      },
    },
  },
  future: {
    // Hover styles only apply on devices that can hover — simplifies mobile.
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
}
