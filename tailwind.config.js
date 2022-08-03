/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "src/**/*{.js,.jsx,.ts,.tsx.html}"],
  theme: {
    extend: {
      screens: {
        lg: "1440px",
      },
      colors: {
        "grayish-blue": "hsl(237, 18%, 59%)",
        "soft-red": "hsl(345, 95%, 68%)",
        white: "hsl(0, 0%, 100%)",
        "dark-desaturated-blue": "hsl(236, 21%, 26%)",
        "very-dark-blue": "hsl(235, 16%, 14%)",
        "very-dark-mostly-black-blue": "hsl(234, 17%, 12%)",
      },
      fontFamily: {
        sans: ["Red Hat Text", "sans-serif"],
        mono: ["Red Hat Mono", "monospace"],
      },
      fontSize: {
        base: "62.5%",
        heading: ["1.8rem", { lineHeight: "2.4rem", letterSpacing: "6.14px" }],
        "heading-lg": [
          "2.2rem",
          { lineHeight: "2.9rem", letterSpacing: "7.5px" },
        ],
        time: ["3.6rem", { lineHeight: "7.1rem", letterSpacing: "-1.08px" }],
        "time-lg": [
          "8.0rem",
          { lineHeight: "7.1rem", letterSpacing: "-2.4px" },
        ],
        unit: [".7rem", { lineHeight: ".9rem", letterSpacing: "2.95937px" }],
        "unit-lg": [
          "1.4rem",
          { lineHeight: "1.9rem", letterSpacing: "5.91875px" },
        ],
      },
      backgroundImage: {
        stars: "url('../images/bg-stars.svg')",
      },
    },
  },
  plugins: [],
};
