import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', 
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        card: 'var(--card)',
        foreground: 'var(--foreground)',
        muted: {
          foreground: 'var(--muted-foreground)',
        },
        border: 'var(--border)',
        row: {
          hover: 'var(--row-hover)',
        }
      },
    },
  },
  plugins: [],
}
export default config