import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CA6DF', // Azul confiável/calmante
        secondary: '#BFFF00', // Verde esperança/crescimento
        accent: '#FF6B00', // Laranja energia/motivação
        tertiary: '#EE99B8', // Rosa empatia/conexão
        deep: '#5E18EB', // Roxo profundidade/inconsciente
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      dropShadow: {
        'brutal': '12px 12px 0 rgb(0 0 0)',
        'brutal-hover': '8px 8px 0 rgb(0 0 0)',
        'brutal-sm': '6px 6px 0 rgb(0 0 0)',
        'brutal-sm-hover': '3px 3px 0 rgb(0 0 0)',
        'brutal-xs': '4px 4px 0 rgb(0 0 0)',
        'brutal-xs-hover': '2px 2px 0 rgb(0 0 0)',
      },
    },
  },
  plugins: [],
};

export default config;
