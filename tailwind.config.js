/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        desktop: '1024px',
      },
      maxWidth: {
        phone: '390px',
      },
      colors: {
        daum: {
          blue: '#1E83FF',
          green: '#18BA68',
          yellow: '#FCA213',
          red: '#F85F65',
        },
        // Semantic content tokens (gray scale aliases)
        content: {
          primary: '#111827',    // gray-900 — title/body
          strong: '#374151',     // gray-700 — emphasized body
          secondary: '#6B7280',  // gray-500 — meta text
          muted: '#9CA3AF',      // gray-400 — timestamps
          faint: '#D1D5DB',      // gray-300 — dot separators
          divider: '#F3F4F6',    // gray-100 — borders/dividers
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F9FAFB',        // gray-50
          gap: '#F3F4F6',        // gray-100 — between sections
        },
      },
      fontSize: {
        // Semantic typography scale — size only.
        // Line-height is intentionally not set here; use `leading-*` utilities
        // at the call site when specific line-height is needed. Otherwise the
        // browser default (`normal`) applies, matching pre-token behavior.
        'heading-lg': '18px',
        heading: '16px',
        title: '15px',
        body: '14px',
        'body-sm': '13px',
        caption: '12px',
        meta: '11px',
        nano: '9px',
        micro: '10px',
      },
      borderRadius: {
        card: '8px',
        chip: '9999px',
      },
    },
  },
  plugins: [],
};
