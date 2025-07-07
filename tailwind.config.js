/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0088CC',
        secondary: '#1C2733',
        accent: '#00BFA5',
        surface: '#242F3D',
        background: '#17212B',
        success: '#00C853',
        warning: '#FFB300',
        error: '#FF5252',
        info: '#2196F3',
        'text-primary': '#FFFFFF',
        'text-secondary': '#8E9297',
        'text-tertiary': '#707579',
        'message-sent': '#0088CC',
        'message-received': '#2B3A4A',
        'online': '#00BFA5',
        'offline': '#707579'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-typing': 'bounce 1.4s infinite',
        'scale-in': 'scale-in 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}