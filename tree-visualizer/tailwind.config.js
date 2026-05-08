/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Mono"', 'monospace'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
      },
      colors: {
        canvas: '#0d1117',
        surface: '#161b22',
        border: '#30363d',
        node: {
          DEFAULT: '#1c2333',
          hover: '#2d3748',
          selected: '#1a3a5c',
        },
        accent: {
          blue: '#58a6ff',
          green: '#3fb950',
          orange: '#f0883e',
          purple: '#bc8cff',
        }
      },
    },
  },
  plugins: [],
}
