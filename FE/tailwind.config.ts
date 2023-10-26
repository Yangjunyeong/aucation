import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        customGray: "#646C76",
        customBgBlue: "#247eff",
        customBgLightBlue: "#D4E0FF",
        mapCustom: '#fff'
      },
      textColor: {
        customGray: "#9EA6B2",
        customBlue: "#247eff",
        myPageGray: "#7A7A7A",
      },
      borderColor: {
        customGray: "#9EA6B2",
      },
      fontSize: {
        "27px": "27px",
      },
    },
  },
  plugins: [],
};
export default config;
