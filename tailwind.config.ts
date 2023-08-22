import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "clr-0": "#FFFFFF",
        "clr-1": "#FF9300",
        "clr-2": "#FBA42D",
        "clr-3": "#FBBE2C",
        "clr-4": "#3D3D3D",
        "clr-5": "#727272",
        "clr-6": "#EAE1DF",
        "clr-7": "#BFD5E2",
        "clr-8": "#DE8209",
        "clr-9": "#BD7112",
        "clr-10": '#9D601B',
        "clr-11": "#f1faee",
        "clr-x": "rgba(0, 0, 0, 0.25)",
      }
    },
  },
  plugins: [],
}
export default config
