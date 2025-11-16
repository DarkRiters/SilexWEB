/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: '#ffffff',
          muted: '#f8fafc',   // tło stron w light
          dark: '#020617',    // tło w dark (zbliżone do bg-slate-950)
        },
        border: {
          soft: '#e2e8f0',    // slate-200
          strong: '#cbd5f5',
          dark: '#334155',    // slate-700
        },
        text: {
          main: {
            light: '#0f172a', // slate-900
            dark: '#f9fafb',  // slate-50
          },
          muted: {
            light: '#64748b', // slate-500
            dark: '#94a3b8',  // slate-400
          },
          danger: '#ef4444',
        },
        brand: {
          primary: '#0ea5e9',      // sky-500
          primaryHover: '#0284c7', // sky-600
        },
      },
      borderRadius: {
        card: '1rem',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 10px 40px rgba(15,23,42,0.18)',
        soft: '0 4px 10px rgba(15,23,42,0.12)',
      },
    },
  },
  plugins: [],
};
