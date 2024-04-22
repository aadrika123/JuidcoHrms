import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#3A3838",
        secondary: "#484646F2",
        primary_green: "#E1E7FF",
        primary_blue: "#4338CA",
      },

      fontSize: {
        sub_head: " 1.22294rem",
        mid_head: "25px",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
