import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gmail: {
          red: '#EA4335',
          blue: '#4285F4',
          yellow: '#FBBC04',
          green: '#34A853',
        }
      }
    },
  },
  plugins: [],
};
export default config;
