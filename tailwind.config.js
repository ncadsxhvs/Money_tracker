/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // expense.fyi inspired color palette
        primary: {
          50: '#fef3c7',
          100: '#fde68a',
          200: '#fcd34d',
          300: '#fbbf24',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
        },
        dark: {
          900: '#18181b', // zinc-900
          800: '#27272a', // zinc-800
          700: '#3f3f46', // zinc-700
        },
        success: '#16a34a', // green-600
        background: {
          gradient: {
            from: '#e0f2fe', // sky-100
            via: '#ffffff',
            to: '#e0f2fe',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-expense': 'linear-gradient(to right, #f59e0b, #ea580c)', // amber-400 to orange-600
        'gradient-bg': 'linear-gradient(to bottom, #e0f2fe, #ffffff, #e0f2fe)',
      },
      letterSpacing: {
        tighter: '-0.03em',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
