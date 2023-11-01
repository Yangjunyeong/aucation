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
        "main-floor": "url('./images/MainFloorImg.png')",
        "custom-btn-gradient": "linear-gradient(170deg, #5bf, #51f)",
        "custom-btn-gradient-hover": "linear-gradient(170deg, #4aa, #419)",
        "custom-btn-gradient-red": "linear-gradient(170deg, #f43, #f15)",
        "custom-btn-gradient-red-hover": "linear-gradient(170deg, #f73, #f56)",
      },
      backgroundColor: {
        customGray: "#646C76",
        customBgBlue: "#247eff",
        customBgLightBlue: "#D4E0FF", // 중간 포인트 색
        mapCustom: "#fff",
      },
      textColor: {
        customGray: "#9EA6B2",
        customBlue: "#247eff",
        myPageGray: "#7A7A7A",
        customLightTextColor: "#646C76", // 연한 글자 색
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
