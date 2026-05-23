import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          '"Segoe UI Variable"', '"Segoe UI"', 'Roboto', '"Helvetica Neue"',
          'Arial', '"Noto Sans"', 'sans-serif',
          '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"',
        ],
      },
      colors: {
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          alt: 'rgb(var(--color-surface-alt) / <alpha-value>)',
          raised: 'rgb(var(--color-surface-raised) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
          subtle: 'rgb(var(--color-border-subtle) / <alpha-value>)',
        },
        content: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary-hover) / <alpha-value>)',
        },
        ring: 'rgb(var(--color-ring) / <alpha-value>)',
        danger: {
          DEFAULT: 'rgb(var(--color-danger) / <alpha-value>)',
          bg: 'rgb(var(--color-danger-bg) / <alpha-value>)',
        },
        'badge-give-bg': 'rgb(var(--color-badge-give-bg) / <alpha-value>)',
        'badge-give-text': 'rgb(var(--color-badge-give-text) / <alpha-value>)',
        'badge-need-bg': 'rgb(var(--color-badge-need-bg) / <alpha-value>)',
        'badge-need-text': 'rgb(var(--color-badge-need-text) / <alpha-value>)',
        'badge-lend-bg': 'rgb(var(--color-badge-lend-bg) / <alpha-value>)',
        'badge-lend-text': 'rgb(var(--color-badge-lend-text) / <alpha-value>)',
        'badge-event-bg': 'rgb(var(--color-badge-event-bg) / <alpha-value>)',
        'badge-event-text': 'rgb(var(--color-badge-event-text) / <alpha-value>)',
        'badge-test-bg': 'rgb(var(--color-badge-test-bg) / <alpha-value>)',
        'badge-test-text': 'rgb(var(--color-badge-test-text) / <alpha-value>)',
      },
    },
  },
} satisfies Config
